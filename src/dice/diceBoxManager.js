// Singleton wrapper around @3d-dice/dice-box.
// Lazily initialised only when the user opts in to 3D dice.

let box = null;
let initPromise = null;

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
    });
    await instance.init();
    box = instance;
    return box;
  })();

  return initPromise;
}

export function getDiceBox() {
  return box;
}

export function clearDiceBox() {
  box?.clear();
}
