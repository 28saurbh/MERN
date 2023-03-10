const mongoose = require('mongoose')

module.exports = dbconnect = async () => {

    const Uri = "mongodb+srv://sourabh:HpolNH7sKvpNViwE@cluster0.erbczly.mongodb.net/?retryWrites=true&w=majority"

    try {
        const connect = await mongoose.connect(Uri, { useNewUrlParser: true, useUnifiedTopology: true, })
        console.log("db connected  ");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

}
