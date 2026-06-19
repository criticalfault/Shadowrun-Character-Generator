import { useState, useCallback } from 'react';
import { getDicePreference, setDicePreference, isMobile } from '../hooks/useDicePreference';
import { initDiceBox, clearDiceBox } from './diceBoxManager';
import { resolveResults, rollSimple } from './rollSR';

// Returns { roll, result, rolling, clear, needsPrompt, onPromptClose }
// roll({ label, pool, tn }) — kicks off a roll
// needsPrompt — true when we need to show DiceStylePrompt first
export function useRollDice() {
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [needsPrompt, setNeedsPrompt] = useState(false);
  const [pendingRoll, setPendingRoll] = useState(null);

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
      } catch (e) {
        // Fall back to simple on any error
        const resolved = rollSimple(pool, tn);
        setResult({ ...resolved, label, pool });
      }
    } else {
      // Brief animation delay so the simple result panel feels responsive
      await new Promise((r) => setTimeout(r, 400));
      const resolved = rollSimple(pool, tn);
      setResult({ ...resolved, label, pool });
    }
    setRolling(false);
  }, []);

  const roll = useCallback(
    (opts) => {
      const pref = getDicePreference();
      if (pref === null && !isMobile()) {
        // Haven't chosen yet — prompt first, queue the roll
        setPendingRoll(opts);
        setNeedsPrompt(true);
      } else {
        executeRoll(opts);
      }
    },
    [executeRoll]
  );

  const onPromptClose = useCallback(
    (choice) => {
      if (choice !== null) setDicePreference(choice);
      setNeedsPrompt(false);
      if (pendingRoll) {
        setPendingRoll(null);
        executeRoll(pendingRoll);
      }
    },
    [pendingRoll, executeRoll]
  );

  const clear = useCallback(() => {
    setResult(null);
    clearDiceBox();
  }, []);

  return { roll, result, rolling, clear, needsPrompt, onPromptClose };
}
