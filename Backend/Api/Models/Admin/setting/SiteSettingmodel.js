const db = require("../../../config/dbconnection");


const getSiteSetting = (callback) => {   
    const query = "SELECT * FROM settings";
    db.query(query, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    });
};
const getaccountsetting = (callback) => {   
    const query = "SELECT * FROM admins";
    db.query(query, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    });
};
 
const updateaccountsetting = ( data , picture, callback) => {   
    const query = "UPDATE admins SET email = COALESCE(?, email) , name = COALESCE(?, name) , picture = COALESCE(?, picture) ";
    db.query(query,[data.email , data.name , picture] , (err, result) => {
        if (err) return  callback(err, null);
        callback(null, result);
    });
};  

const updatepassword = (password , callback) => {   
    const query = "UPDATE admins SET password = ?  ";
    db.query(query,[password] , (err, result) => {
        if (err) return  callback(err, null);
        callback(null, result);
    });
};  

const getpassword = (callback) => {   
    const query = "SELECT password FROM admins";
    db.query(query, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    });
};

module.exports = { getSiteSetting  , getaccountsetting , updateaccountsetting , updatepassword , getpassword};