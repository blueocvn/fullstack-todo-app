/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

//REMOVE TOKEN
const removeItemFromStorage = (key: any) => localStorage.removeItem(key);

//SET TOKEN
const setTokens = (tokens: {}) => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

//GET TOKEN
const getTokens = () => {
  const tokens = localStorage.getItem('tokens') || '{"error": "null"}';

  if (tokens === 'undefined') {
    removeItemFromStorage('tokens');
    window.location.replace('/');
  }

  return JSON.parse(tokens);
};

export { getTokens, removeItemFromStorage, setTokens };
