import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';

function encryptToStorage(data, passphrase) {
  const encrypted = AES.encrypt(data, passphrase);
  return `enc+${encrypted}`;
}

function decryptFromStorage(data, passphrase) {
  data = data.slice(4); // remove enc+

  try {
    const bytes = AES.decrypt(data, passphrase);
    return bytes.toString(utf8);
  } catch (err) {
    throw new Error(err);
  }
}

export {
  encryptToStorage,
  decryptFromStorage
};
