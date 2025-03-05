const db = require("../../../config/dbconnection");

const getPromocodes = (callback) => {
  const query = "SELECT * FROM promocodes";
  db.query(query, (err, result) => {
    if (err) callback(err, null);
    callback(null, result);
  });
};

const editgetpromocode = (id, callback) => {
  const query = "SELECT * FROM promocodes WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) callback(err, null);
    callback(null, result);
  });
};

const updatePromocode = ( id ,data, callback) => {
  const query =
    "UPDATE promocodes SET promo_code = ?, discount = ?, expiration = ?, status = ? WHERE id = ?";
  db.query(
    query,
    [data.promo_code, data.discount, data.expiration, data.status, id],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

const addPromocode = (data, callback) => {
    console.log(data);
    
  const query =
    "INSERT INTO promocodes (promo_code, discount, expiration) VALUES (?,?,?)";
  db.query(
    query,
    [data.promo_code, data.discount, data.expiration],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

const deletePromocode = (id, callback) => {
  const query = "DELETE FROM promocodes WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) callback(err, null);
    callback(null, result);
  });
};
module.exports = {
  getPromocodes,
  editgetpromocode,
  updatePromocode,
  addPromocode,
  deletePromocode,
};
