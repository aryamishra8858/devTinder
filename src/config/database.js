const mongoose = require("mongoose");

const connectDB = async () => {
        await mongoose.connect(
            "mongodb+srv://aryamishra8858:kavya098@namastenode.mka9mdg.mongodb.net/devTinder",
        );
};

module.exports = connectDB;
