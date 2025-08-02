const validator = require('validator');

const validateSignupData = (req) => {  

    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name are required");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Valid email is required");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Strong password is required");
    }
};


module.exports = {
    validateSignupData, 
};