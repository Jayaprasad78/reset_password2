const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const secretKey = 'jayaprasad1234drtyvdflmlsfficientabcdefghijklmn';
const multer = require('multer');
const crypto = require('crypto');
const cors = require('cors');

router.use(cors());
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
// require('../db/conn'); // You may need to configure your database connection

const User = require('../userschema/userschema');




// Define the signup route


router.post("/", async(req, res) => {
  const { email, newPassword } = req.body;
  const userExist = await User.findOne({ email });
  console.log(userExist);
  // Find the user by email in the mock database
  //const user = users.find((user) => user.email === email);

  if (!userExist) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user's password
  userExist.password = newPassword;
  userExist.cpassword = newPassword;
  console.log(userExist);
  await userExist.save();
  // In a real-world scenario, you would typically hash and securely store the password
  // but for simplicity, we're just updating it in the mock database.

  return res.status(200).json({ message: "Password changed successfully" });
});






module.exports = router;
