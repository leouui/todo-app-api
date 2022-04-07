const { validate } = require("./validate");
const { validateJWT } = require("./validateJWT");
const { findTaskByID } = require("./findTaskByID");

module.exports = {
    validate,
    validateJWT,
    findTaskByID
}
