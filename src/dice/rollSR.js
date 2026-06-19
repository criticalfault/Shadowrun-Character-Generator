// SR2/SR3 dice resolution.
// Rule of 6: a die showing 6 is rerolled and the new value added to its total.
// Keeps going as long as 6s appear. Each original die still counts as 1 success
// if its accumulated total >= TN.

function rollOneDieWithRule6() {
  let total = 0;
  let initial = null;
  let v;
  do {
    v = Math.ceil(Math.random() * 6);
    if (initial === null) initial = v;
    total += v;
  } while (v === 6);
  return { initial, total };
}

// Simple (non-3D) roll — returns dice array, each with { initial, total }
export function rollSimple(pool, tn) {
  const dice = Array.from({ length: pool }, rollOneDieWithRule6);
  const successes = dice.filter((d) => d.total >= tn).length;
  const allOnes = dice.every((d) => d.initial === 1);
  return { dice, successes, allOnes, tn };
}

// Helper for the 3D path: extract flat value array from dice-box result objects
export function extractValues(rollResults) {
  return rollResults.flatMap((g) => (g.rolls ?? [g])).map((d) => d.value);
}
