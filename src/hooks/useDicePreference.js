import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sr_dice_style';

export function isMobile() {
  return (
    window.innerWidth < 768 ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  );
}

// Returns: '3d' | 'simple' | null (null = not yet asked)
export function getDicePreference() {
  return localStorage.getItem(STORAGE_KEY);
}

export function setDicePreference(value) {
  localStorage.setItem(STORAGE_KEY, value);
}

export function useDicePreference() {
  const [pref, setPrefState] = useState(() => getDicePreference());

  const setPref = (value) => {
    setDicePreference(value);
    setPrefState(value);
  };

  return [pref, setPref];
}
