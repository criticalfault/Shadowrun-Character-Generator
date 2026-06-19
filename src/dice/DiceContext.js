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

        const extractValues = (results) =>
          results.flatMap((g) => g.rolls ?? [g]).map((d) => d.value);

        // Initial roll
        const initialResults = await box.roll(`${pool}d6`);
        const initialValues = extractValues(initialResults);

        // Visual Rule of 6: add more dice to the screen for each wave of 6s
        const rerollGroups = [];
        let toReroll = initialValues.filter((v) => v === 6);
        while (toReroll.length > 0) {
          const rerollResults = await box.add(`${toReroll.length}d6`);
          const rerollValues = extractValues(rerollResults);
          rerollGroups.push(rerollValues);
          toReroll = rerollValues.filter((v) => v === 6);
        }

        // Count successes across all dice
        const allValues = [
          ...initialValues,
          ...rerollGroups.flat(),
        ];
        const successes = allValues.filter((v) => v >= tn).length;
        const allOnes = initialValues.length > 0 && initialValues.every((v) => v === 1);
        setResult({ values: initialValues, rerollGroups, successes, allOnes, tn, label, pool });
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
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          pointerEvents: rolling ? 'auto' : 'none',
          zIndex: 1500,
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
