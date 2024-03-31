const { User } = require("../models");
const bcrypt = require("bcryptjs");

const userlogin = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User doesn't exist");
      return { success: false, message: "User doesn't exist" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Wrong password");
      return { success: false, message: "Wrong password" };
    }

    console.log("User is verified");
    return { success: true, message: "User is verified" };
  } catch (error) {
    console.error("Error occurred during login:", error);
    return { success: false, message: "An error occurred during login" };
  }
};

const userSignup = async (name, username, password) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { success: false, message: "Username is already taken" };
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
      name,
      username,
      password: hashedPassword,
    });

    return { success: true, message: "User signed up successfully" };
  } catch (error) {
    console.error("Error occurred during signup:", error);
    return { success: false, message: "An error occurred during signup" };
  }
};

module.exports = {
  userlogin,
  userSignup,
};
