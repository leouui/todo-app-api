const express = require("express")
const {connectToMONGODB} = require("../DB/config")
const cors = require('cors')

class Server {
    constructor() {
        this.app = express() 
        this.PORT = process.env.PORT
        this.connectDB()
        this.middlewares()
        this.routes()
    }
    async connectDB() {
        await connectToMONGODB()
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.static("public"))
        this.app.use(express.json())
    }
    routes(){
        this.app.use("/api/auth", require("../routes/auth.route"))
        this.app.use("/api/tasks", require("../routes/tasks.route"))
        this.app.use("/*",(req,res)=> {
            res.status(404).json({
                msg:"Endpoint not found",
                cod:404
            })
        })
    }
    listen() {
        this.app.listen(this.PORT,()=>{
            console.log("Listening on port " + this.PORT);
        })
    }
}

module.exports = Server