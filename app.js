const Server = require('./models/Server')
require("dotenv").config(".env")

console.clear()

const server = new Server()

server.listen()