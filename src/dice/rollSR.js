// SR2/SR3 dice resolution helpers.
// Roll a pool of d6s against a target number; count dice >= TN as successes.

export function resolveResults(rollResults, tn) {
  const dice = rollResults.flatMap((group) =>
    group.rolls ? group.rolls : [group]
  );
  const values = dice.map((d) => d.value);
  const successes = values.filter((v) => v >= tn).length;
  const allOnes = values.length > 0 && values.every((v) => v === 1);
  return { values, successes, allOnes, tn };
}

// Simple local roll (no 3D) — returns same shape
export function rollSimple(pool, tn) {
  const values = Array.from({ length: pool }, () => Math.ceil(Math.random() * 6));
  const successes = values.filter((v) => v >= tn).length;
  const allOnes = values.length > 0 && values.every((v) => v === 1);
  return { values, successes, allOnes, tn };
}
