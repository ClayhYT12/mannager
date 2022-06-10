const {
    pbkdf2Sync
  } = await import('node:crypto');
  
function encrypt(password) {
    const key = pbkdf2Sync(password, 'salt', 100000, 64, 'sha512');
    console.log(key.toString('hex')); 
}

function decrypt(password) {
crypto.DEFAULT_ENCODING = 'hex';
const key = crypto.pbkdf2Sync(password, 'salt', 100000, 512, 'sha512');
console.log(key);  // '3745e48...aa39b34'
}

export default encrypt = encrypt;
export {decrypt};
