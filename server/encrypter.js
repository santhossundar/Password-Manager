const crypto = require('crypto');
const secret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const encrypt = (password) => {
    const iv = Buffer.from(crypto.randomBytes(16));

    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

    const encryptPassword = Buffer.concat([cipher.update(password), cipher.final()]);

    return {iv: iv.toString('hex'), password: encryptPassword.toString('hex')};

};

const decrypt = (encryption) => {
    const decipher = crypto.createDecipher('aes-256-ctr', Buffer.from(secret), Buffer.from(encryption.iv, 'hex'));

    const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryption.password, 'hex')), decipher.final()]);

    return decryptedPassword.toString;
};

module.exports = { encrypt, decrypt };


