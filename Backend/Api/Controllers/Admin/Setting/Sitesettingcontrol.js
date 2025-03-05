const sitesettingmodel = require("../../../Models/Admin/setting/SiteSettingmodel");
const bcrypt = require("bcryptjs");

const getSiteSetting = (req, res) => {
  sitesettingmodel.getSiteSetting((err, result) => {
    if (err) {
      res.status(500).send({
        error: "Internal Server Error",
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const getaccountsetting = (req, res) => {
  sitesettingmodel.getaccountsetting((err, result) => {
    if (err) {
      res.status(500).send({
        error: "Internal Server Error",
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const updateaccountsetting = (req, res) => {
  const data = req.body;
  const picture = req.file ? `${req.file.filename}` : null;
  console.log(picture);

  sitesettingmodel.updateaccountsetting(data, picture, (err, result) => {
    if (err) {
      res.status(500).send({
        error: "Internal Server Error",
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const updatepassword = (req, res) => {
  const { old_password, new_password, confirm_password } = req.body;
  if (!old_password || !new_password || !confirm_password) {
    return res.status(400).send({ message: "All fields are required" });
  }
  if (new_password !== confirm_password) {
    return res.status(400).send({ message: "confirm password doesn't match" });
  }
  sitesettingmodel.getpassword(async (err, result) => {
    if (err) {
      res.status(500).send({
        error: "Internal Server Error",
      });
    } else {
      const isMatch = await bcrypt.compare(old_password, result[0].password);
      if (!isMatch) {
        return res.status(400).send({ message: " Old Password doesn't match" });
      }
      const haspassword = await bcrypt.hash(new_password, 10);
      sitesettingmodel.updatepassword(haspassword, (err, result) => {
        if (err) {
          res.status(500).send({
            error: "Internal Server Error",
          });
        } else {
          res.status(200).send({
            message: "Password updated successfully",
          });
        }
      });
    }
  });
};

module.exports = {
  getSiteSetting,
  getaccountsetting,
  updateaccountsetting,
  updatepassword,
};
