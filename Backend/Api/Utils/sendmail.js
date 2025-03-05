const transporter = require("../config/Nodemailercontrol");

const sendEmail = (to, subject, text, callback) => {
  const mailOptions = {
    from: "pankhaniyavivek10@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return callback(error);
    callback(null);
  });
};

module.exports = sendEmail;