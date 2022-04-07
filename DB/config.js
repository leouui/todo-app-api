const { default: mongoose } = require("mongoose")

const connectToMONGODB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
        console.log("Couldn't connect to MongoDB'")
    }
}

module.exports = {connectToMONGODB}