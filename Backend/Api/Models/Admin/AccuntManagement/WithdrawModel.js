const db = require("../../../config/dbconnection");

const getwithdrawrequest = (callback) => {
  const query = `SELECT 
    id AS request_id, 
    bank_account_id, 
    provider_id, 
    amount, 
    status, 
    created_at, 
    updated_at 
FROM withdrawal_moneys`;
  db.query(query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
const getbankdetailes = (id, callback) => {
  const query = `SELECT 
    ba.id, 
    ba.account_name, 
    ba.bank_name, 
    ba.account_number, 
    ba.IFSC_code, 
    ba.MICR_code, 
    ba.country, 
    wm.amount AS withdrawal_amount,
    wm.status AS status
FROM bank_accounts AS ba
LEFT JOIN withdrawal_moneys AS wm ON ba.id = wm.bank_account_id
WHERE ba.id = ? `;

  db.query(query, id, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const updatestatus = (id, newstatus, callback) => {
  const query = `UPDATE withdrawal_moneys SET status = ? WHERE id= ?`;
  db.query(query,[ newstatus, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getaccountstatus = (id, callback) => {
    const query = "SELECT status FROM withdrawal_moneys WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
      // console.log(result);
      
    });
  };

module.exports = { getwithdrawrequest, getbankdetailes  , updatestatus , getaccountstatus};
