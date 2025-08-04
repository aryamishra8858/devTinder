const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Valid email is required");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Strong password is required");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "gender",
    "age",
    "skills",
    "photoUrl",
  ];
  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedEditFields.includes(fields)
  );

   return isEditAllowed;
};

module.exports = {
  validateSignupData,
  validateEditProfileData
};
