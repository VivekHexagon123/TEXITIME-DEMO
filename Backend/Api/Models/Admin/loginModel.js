const db = require ("../../config/dbconnection")


const adminlogin = (email,callback) =>{
    const query = "SELECT * FROM admins WHERE email = ?"
    db.query(query, email,(err , result) =>{
        if (err) {
        return callback(null,err)
        }
        return callback(null , result)
    })
}


module.exports ={adminlogin}