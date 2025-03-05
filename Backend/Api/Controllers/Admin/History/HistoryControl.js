
// this module use for statementmodel in history control file 

const statementModule = require("../../../Models/Admin/AccuntManagement/StatementModul");

const RequestHistory = (req, res) => {
  statementModule.getallridestatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    console.log(result.filter((row) => row.status === "COMPLETED" || row.status === "CANCELLED"));
    return res.status(200).json({
      message: "Success",
      result : result.filter((row) => row.status === "COMPLETED" || row.status === "CANCELLED"),
    });
  });
};

const ScheduledHistory = (req, res) => {
    statementModule.getallridestatement((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server error",
        });
      }

      return res.status(200).json({
        message: "Success",
        result : result.filter((row) => row.status === "SCHEDULED"),
      });
    });
  };
// console.log(result.filter((row) => row.status === "COMPLETED" || row.status === "CANCELLED"));
module.exports = {  RequestHistory , ScheduledHistory };

