const statementModule = require("../../../Models/Admin/AccuntManagement/StatementModul");

const overallridessatementcount = (req, res) => {
  statementModule.getoverallridestatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};

const allridessatementcount = (req, res) => {
  statementModule.getallridestatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};

const ridessatement = (req, res) => {
  const { id } = req.params;
  statementModule.getridestatement(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};

const providersatement = (req, res) => {
  statementModule.getproviderstatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};

const providerridessatement = (req, res) => {
  const { id } = req.params;
  statementModule.getproviderridestatement(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};

const daysatementcount = (req, res) => {
  statementModule.getdaystatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
const alldayridessatementcount = (req, res) => {
  statementModule.getdayridestatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
const monthlysatementcount = (req, res) => {
  statementModule.getmonthlystatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
const allmonthlyridessatementcount = (req, res) => {
  statementModule.getmonthlyridestatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
const yearsatementcount = (req, res) => {
  statementModule.getyearstatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
const allyearsridessatementcount = (req, res) => {
  statementModule.getyearridestatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
module.exports = {
  overallridessatementcount,
  allridessatementcount,
  ridessatement,
  providersatement,
  providerridessatement,
  daysatementcount,
  alldayridessatementcount,
  monthlysatementcount,
  allmonthlyridessatementcount,
  yearsatementcount,
  allyearsridessatementcount
};
