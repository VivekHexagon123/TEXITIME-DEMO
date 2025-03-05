const db = require("../../../config/dbconnection");

const getuserReview = (callback) => {
  const query = `select URR.id ,URR.request_id,URR.user_id,URR.user_rating,URR.user_comment , URR.created_at, CONCAT(Us.first_name, ' ', Us.last_name) AS user_name , CONCAT(Pr.first_name, ' ', Pr.last_name) AS provider_name from user_request_ratings as URR 
LEFT JOIN users AS Us ON URR.user_id = US.id
LEFT JOIN providers AS Pr ON URR.provider_id = Pr.id`;
  db.query(query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
const getproviderReview = (callback) => {
  const query = `select URR.id ,URR.request_id,URR.provider_id,URR.provider_rating,URR.provider_comment ,URR.created_at , CONCAT(Pr.first_name, ' ', Pr.last_name) AS provider_name,CONCAT(Us.first_name, ' ', Us.last_name) AS user_name from user_request_ratings as URR
 LEFT JOIN providers AS Pr ON URR.provider_id = Pr.id
 LEFT JOIN users AS Us ON URR.user_id = US.id`;
  db.query(query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
module.exports = {
  getuserReview,
  getproviderReview,
};
