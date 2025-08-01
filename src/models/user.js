const mongoose = require("mongoose");
const validator = require("validator");

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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
          validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Email a strong password" +value);
            }
        }
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
        validator(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is not valid");
            }
        }
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
