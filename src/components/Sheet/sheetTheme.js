// Shared MUI sx helpers for the clean B&W sheet display.
// Import these instead of hardcoding dark-theme colors in each component.

export const inputSx = {
  mb: 1.5,
  '& .MuiOutlinedInput-root': {
    color: '#000',
    backgroundColor: '#fff',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    '& fieldset': { borderColor: '#aaa' },
    '&:hover fieldset': { borderColor: '#000' },
    '&.Mui-focused fieldset': { borderColor: '#000', borderWidth: '1px' },
  },
  '& .MuiInputLabel-root': { color: '#555', fontSize: '0.85rem' },
  '& label.Mui-focused': { color: '#000' },
  '& .MuiInputBase-input': { color: '#000' },
};

export const tablePaperSx = { backgroundColor: '#fff', boxShadow: 'none' };

export const checkboxSx = {
  color: '#aaa',
  '&.Mui-checked': { color: '#000' },
  padding: '2px 4px',
};
