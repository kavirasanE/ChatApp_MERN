const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
            // useFindAndModify: true
        });

        // console.log(`Mongo Db Connected ${connect.connection.host}`);
    }
    catch (err) {
        console.log(err)
    }
}
module.exports = connectDB;