const pool = require("../postgresdb");
const bcrypt = require("bcrypt");

const registerUsers = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      throw new Error({message: "Username and password are required"});
    }
    const response = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (response.rows.length > 0) {
      throw new Error({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const insert = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );
    res.json(insert.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUsers,
};
