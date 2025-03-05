const withdrawModel = require("../../../Models/Admin/AccuntManagement/WithdrawModel");

const getwaitingrequest = (req, res) => {
  withdrawModel.getwithdrawrequest((err, result) => {
    if (err) {
      console.log(err);
    }

    // console.log(result.filter(row => row.status === 'WAITING'))

    res.status(200).send(result.filter((row) => row.status === "WAITING"));
  });
};
const getapprovedrequest = (req, res) => {
  withdrawModel.getwithdrawrequest((err, result) => {
    if (err) {
      console.log(err);
    }

    // console.log(result.filter(row => row.status === 'WAITING'))

    res.status(200).send(result.filter((row) => row.status === "APPROVED"));
  });
};
const getdisapprovedrequest = (req, res) => {
  withdrawModel.getwithdrawrequest((err, result) => {
    if (err) {
      console.log(err);
    }

    // console.log(result.filter(row => row.status === 'WAITING'))

    res.status(200).send(result.filter((row) => row.status === "DISAPPROVED"));
  });
};

const getwaitingbankdetailes = (req, res) => {
  const Id = req.params.id;
  withdrawModel.getbankdetailes(Id, (err, result) => {
    if (err) {
      console.log(err);
    }

    console.log(result.filter((row) => row.status === "WAITING"));

    res.status(200).send(result.filter((row) => row.status === "WAITING"));
  });
};
const getapprovedbankdetailes = (req, res) => {
  const Id = req.params.id;
  withdrawModel.getbankdetailes(Id, (err, result) => {
    if (err) {
      console.log(err);
    }

    // console.log(result.filter((row) => row.status === "APPROVED"));

    res.status(200).send(result.filter((row) => row.status === "APPROVED"));
  });
};
const getdisapprovedbankdetailes = (req, res) => {
  const Id = req.params.id;
  withdrawModel.getbankdetailes(Id, (err, result) => {
    if (err) {
      console.log(err);
    }

    // console.log(result.filter((row) => row.status === "DISAPPROVED"));

    res.status(200).send(result.filter((row) => row.status === "DISAPPROVED"));
  });
};

const approvedstaus = (req, res) => {
  const id = req.params.id;
  // console.log(id);

  withdrawModel.getaccountstatus(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    let currentStatus = result[0].status;
    // console.log(currentStatus);

    let newStatus;

    if (currentStatus === "WAITING") {
      newStatus = "APPROVED";
    } else {
      return res
        .status(500)
        .json({ message: "User is Appoverd, status cannot be changed" });
    }
    withdrawModel.updatestatus(id, newStatus, (err, updateresult) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: `your account is ${newStatus}` });
    });
  });
};
const disapprovedstaus = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  withdrawModel.getaccountstatus(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    let currentStatus = result[0].status;
    // console.log(currentStatus);

    let newStatus;

    if (currentStatus === "APPROVED") {
      newStatus = "DISAPPROVED";
    } else {
      return res
        .status(500)
        .json({ message: "User is Appoverd, status cannot be changed" });
    }
    // console.log(newStatus);

    withdrawModel.updatestatus(id, newStatus, (err, updateresult) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: `your account is ${newStatus}` });
    });
  });
};

const reapprovedstaus = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  withdrawModel.getaccountstatus(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    let currentStatus = result[0].status;
    // console.log(currentStatus);

    let newStatus;

    if (currentStatus === "DISAPPROVED") {
      newStatus = "APPROVED";
    } else {
      return res
        .status(500)
        .json({ message: "User is Appoverd, status cannot be changed" });
    }
    // console.log(newStatus);

    withdrawModel.updatestatus(id, newStatus, (err, updateresult) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: `your account is ${newStatus}` });
    });
  });
};

module.exports = {
  reapprovedstaus,
  getdisapprovedbankdetailes,
  disapprovedstaus,
  getapprovedbankdetailes,
  getwaitingrequest,
  getapprovedrequest,
  getdisapprovedrequest,
  getwaitingbankdetailes,
  approvedstaus,
};
