const bcryptjs = require('bcryptjs');

const encryptTxt = (txt,difficulty = 10) => bcryptjs.hashSync(txt,bcryptjs.genSaltSync(difficulty))

module.exports = {encryptTxt}