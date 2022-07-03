const { validate } = require("./validate");
const { validateJWT } = require("./validateJWT");
const { findTasksByID } = require("./findTasksByID");

module.exports = {
    validate,
    validateJWT,
    findTasksByID
}
