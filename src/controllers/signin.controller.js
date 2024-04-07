const pool = require("../postgresdb");
const bcrypt = require("bcrypt");
const {JWT_KEY} = require("../config");
const jwt = require("jsonwebtoken");

const loginUsers = async (req, res, next) => {
  try {
    const {email, password: bodypassword} = req.body;
    if (!email || !bodypassword) {
      throw new Error({message: "Email and password are required"});
    }
    const response = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (response.rows.length === 0) {
      throw new Error({
        message: "User doesnt exists",
      });
    }
    const [user] = response.rows;
    const isMatch = bcrypt.compareSync(bodypassword, user.password);
    if (!isMatch) {
      throw new Error({
        message: "Password mismatch",
      });
    }

    const token = jwt.sign({email}, JWT_KEY, {expiresIn: "1h"});
    const {password, ...currentUser} = user;

    res.json({token, user: currentUser});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUsers,
};
