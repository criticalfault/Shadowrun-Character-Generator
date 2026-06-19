// SR2/SR3 dice resolution helpers.
// Roll a pool of d6s against a target number; count dice >= TN as successes.
// Rule of 6: any die showing 6 is rerolled and extra successes added (recursively).

function applyRule6(values, tn) {
  let successes = 0;
  let rerollGroups = []; // each entry is an array of reroll values at that depth

  const process = (vals) => {
    const sixes = [];
    for (const v of vals) {
      if (v >= tn) successes++;
      if (v === 6) sixes.push(v);
    }
    if (sixes.length > 0) {
      const rerolled = sixes.map(() => Math.ceil(Math.random() * 6));
      rerollGroups.push(rerolled);
      process(rerolled);
    }
  };

  process(values);
  return { successes, rerollGroups };
}

export function resolveResults(rollResults, tn) {
  const dice = rollResults.flatMap((group) =>
    group.rolls ? group.rolls : [group]
  );
  const values = dice.map((d) => d.value);
  const allOnes = values.length > 0 && values.every((v) => v === 1);
  const { successes, rerollGroups } = applyRule6(values, tn);
  return { values, successes, allOnes, rerollGroups, tn };
}

// Simple local roll (no 3D) — returns same shape
export function rollSimple(pool, tn) {
  const values = Array.from({ length: pool }, () => Math.ceil(Math.random() * 6));
  const allOnes = values.length > 0 && values.every((v) => v === 1);
  const { successes, rerollGroups } = applyRule6(values, tn);
  return { values, successes, allOnes, rerollGroups, tn };
}
