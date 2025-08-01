const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String
    },
    age: {
        type: Number,
        min: 18,
        max: 50,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://example.com/default-profile.png",
    },
    about: {
        type: String,
        default: "No information provided",
    },
    skills: {
        type: [String]
    }
},
{
    timestamps: true // Automatically add createdAt and updatedAt fields
}
);

module.exports = mongoose.model("User", userSchema);
