const bcryptjs = require('bcryptjs');

const compareEncryptTxt = (txt,hash) =>  bcryptjs.compareSync(txt, hash)

module.exports = {compareEncryptTxt}