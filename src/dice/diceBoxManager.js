// Singleton wrapper around @3d-dice/dice-box.
// Lazily initialised only when the user opts in to 3D dice.

let box = null;
let initPromise = null;

const INIT_TIMEOUT_MS = 8000;

export async function initDiceBox(containerId = 'dice-box-container') {
  if (box) return box;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const { default: DiceBox } = await import('@3d-dice/dice-box');
    const instance = new DiceBox(`#${containerId}`, {
      assetPath: '/dice-box-assets/',
      startingHeight: 8,
      throwForce: 6,
      spinForce: 5,
      lightIntensity: 1,
      theme: 'default',
      scale: 6,
      offscreen: false, // OffscreenCanvas requires COOP/COEP headers; use main-thread canvas
    });

    // Race init against a timeout so a failed load doesn't hang the UI forever
    await Promise.race([
      instance.init(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('dice-box init timed out')), INIT_TIMEOUT_MS)
      ),
    ]);

    box = instance;
    return box;
  })().catch((err) => {
    console.warn('[dice-box] 3D init failed, will fall back to simple mode:', err);
    initPromise = null; // allow retry next session
    box = null;
    throw err;
  });

  return initPromise;
}

export function getDiceBox() {
  return box;
}

export function clearDiceBox() {
  box?.clear();
}
