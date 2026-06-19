// SR2/SR3 dice resolution helpers.
// Roll a pool of d6s against a target number; count dice >= TN as successes.

export function resolveResults(rollResults, tn) {
  // rollResults: array of dice result objects from dice-box
  // Each object has a `value` property (1-6)
  const dice = rollResults.flatMap((group) =>
    group.rolls ? group.rolls : [group]
  );
  const values = dice.map((d) => d.value);
  const successes = values.filter((v) => v >= tn).length;
  const ones = values.filter((v) => v === 1).length;
  const botch = successes === 0 && ones > Math.floor(values.length / 2);
  return { values, successes, ones, botch, tn };
}

// Simple local roll (no 3D) — returns same shape
export function rollSimple(pool, tn) {
  const values = Array.from({ length: pool }, () => Math.ceil(Math.random() * 6));
  const successes = values.filter((v) => v >= tn).length;
  const ones = values.filter((v) => v === 1).length;
  const botch = successes === 0 && ones > Math.floor(values.length / 2);
  return { values, successes, ones, botch, tn };
}
