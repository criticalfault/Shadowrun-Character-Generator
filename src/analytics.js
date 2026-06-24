// GA4 event helper — wraps window.gtag so it fails silently if blocked
const track = (eventName, params = {}) => {
  try {
    window.gtag('event', eventName, params);
  } catch (_) {}
};

export const trackDiceRolled = (diceCount) =>
  track('dice_rolled', { dice_count: diceCount });

export const trackCharacterLoaded = () =>
  track('character_loaded');

export const trackEditionChanged = (edition) =>
  track('edition_changed', { edition });

export const trackCharacterFinalized = (edition, race) =>
  track('character_finalized', { edition, race });

export const trackTabChanged = (tabName) =>
  track('tab_viewed', { tab_name: tabName });

export const trackCustomVehicleSaved = (edition) =>
  track('custom_vehicle_saved', { edition });

export const trackCustomWeaponSaved = (edition) =>
  track('custom_weapon_saved', { edition });

export const trackCustomDeckSaved = (edition) =>
  track('custom_deck_saved', { edition });

export const trackCharacterSavedWithEdition = (edition) =>
  track('character_saved', { edition });
