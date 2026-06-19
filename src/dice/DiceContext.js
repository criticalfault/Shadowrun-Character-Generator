import React, { createContext, useContext, useState, useCallback } from 'react';
import DiceStylePrompt from '../components/DiceStylePrompt';
import RollDialog from '../components/RollDialog';
import DiceResultOverlay from '../components/DiceResultOverlay';
import { getDicePreference, setDicePreference, isMobile } from '../hooks/useDicePreference';
import { initDiceBox, clearDiceBox } from './diceBoxManager';
import { resolveResults, rollSimple } from './rollSR';

const DiceContext = createContext(null);

export function DiceProvider({ children }) {
  const [promptOpen, setPromptOpen] = useState(false);
  const [rollDialog, setRollDialog] = useState(null); // { label, pool, tn }
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [pendingOpts, setPendingOpts] = useState(null);

  const executeRoll = useCallback(async ({ label, pool, tn }) => {
    const pref = getDicePreference();
    const use3d = pref === '3d' && !isMobile();
    setRolling(true);
    setResult(null);

    if (use3d) {
      try {
        const box = await initDiceBox('dice-box-container');
        clearDiceBox();
        const rollResults = await box.roll(`${pool}d6`);
        const resolved = resolveResults(rollResults, tn);
        setResult({ ...resolved, label, pool });
      } catch {
        const resolved = rollSimple(pool, tn);
        setResult({ ...resolved, label, pool });
      }
    } else {
      await new Promise((r) => setTimeout(r, 400));
      const resolved = rollSimple(pool, tn);
      setResult({ ...resolved, label, pool });
    }
    setRolling(false);
  }, []);

  // openRoll — called by sheet/panel components
  // opts: { label, pool, tn } — opens the roll dialog for confirmation
  const openRoll = useCallback((opts) => {
    setRollDialog(opts);
  }, []);

  const handleRollConfirm = useCallback((opts) => {
    setRollDialog(null);
    const pref = getDicePreference();
    if (pref === null && !isMobile()) {
      setPendingOpts(opts);
      setPromptOpen(true);
    } else {
      executeRoll(opts);
    }
  }, [executeRoll]);

  const handlePromptChoose = useCallback((choice) => {
    if (choice !== null) setDicePreference(choice);
    setPromptOpen(false);
    if (pendingOpts) {
      setPendingOpts(null);
      executeRoll(pendingOpts);
    }
  }, [pendingOpts, executeRoll]);

  return (
    <DiceContext.Provider value={{ openRoll }}>
      {children}

      {/* 3D canvas overlay — always in DOM when 3d pref active, zero-size until roll */}
      <div
        id="dice-box-container"
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: rolling ? 'auto' : 'none',
          zIndex: 1300,
        }}
      />

      <DiceStylePrompt open={promptOpen} onChoose={handlePromptChoose} />

      <RollDialog
        open={!!rollDialog}
        label={rollDialog?.label ?? ''}
        defaultPool={rollDialog?.pool}
        defaultTN={rollDialog?.tn ?? 4}
        onRoll={handleRollConfirm}
        onClose={() => setRollDialog(null)}
      />

      <DiceResultOverlay
        result={result}
        rolling={rolling}
        onClose={() => { setResult(null); clearDiceBox(); }}
      />
    </DiceContext.Provider>
  );
}

export function useDice() {
  return useContext(DiceContext);
}
