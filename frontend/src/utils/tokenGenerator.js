export const generateToken = () => {
  const array = new Uint8Array(16); // Un array de 16 bytes aleatorios
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
