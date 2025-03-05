const loginModel = require("../../Models/Admin/loginModel");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "Admin-Taxi-Time-Token";
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-p arser");

const adminlogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  loginModel.adminlogin(email, async (err, result) => {
    if (err) 
    return res.status(500).json({ success: false, message: "Server error" });

    if (result.length === 0)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const admin = result[0];
    console.log(result[0]);

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
        const token = jwt.sign({ id: admin.id, email: admin.email  }, SECRET_KEY, {
          expiresIn: "1h",
        });
        console.log(token);
        res.cookie("token", token, { secure: true, sameSite: "Strict" ,   maxAge: 3600000 });
    res.status(200).json({ success: true, message: "Login successful!", token });
  }); 
};

const adminlogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful!" });
};

module.exports = { adminlogin , adminlogout};
