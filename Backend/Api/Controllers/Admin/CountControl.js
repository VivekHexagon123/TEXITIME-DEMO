const db = require ('../../config/dbconnection')



const countuser = (req, res) => {
    db.query("SELECT COUNT(*) FROM users", (err, result) => {
        if (err) {
            console.error("Error counting users in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "User count", count: result[0]['COUNT(*)'] });
    });
};
const countDispatchers = (req, res) => {
    db.query("SELECT COUNT(*) FROM dispatchers", (err, result) => {
        if (err) {
            console.error("Error counting users in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: " dispatchers count", count: result[0]['COUNT(*)'] });
    });
};
const countFleets = (req, res) => {
    db.query("SELECT COUNT(*) FROM fleets", (err, result) => {
        if (err) {
            console.error("Error counting fleets in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "fleets count", count: result[0]['COUNT(*)'] });
    });
};
const countproviders = (req, res) => {
    db.query("SELECT COUNT(*) FROM providers", (err, result) => {
        if (err) {
            console.error("Error counting providers in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "providers count", count: result[0]['COUNT(*)'] });
    });
};


module.exports = {countuser , countDispatchers , countFleets , countproviders};