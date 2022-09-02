const ID_SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const makeId = (length: number): string => {
  let text = '';
  for (let i = 0; i < length; i++) {
    text += ID_SYMBOLS.charAt(Math.floor(Math.random() * ID_SYMBOLS.length));
  }
  return text;
};