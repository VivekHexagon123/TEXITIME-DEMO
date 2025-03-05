
const  db = require('../../../config/dbconnection')

const getDocuments = (callback) =>{
    const  query = `SELECT * FROM documents;`
    db.query(query, (err, result) => {
        if(err){
            return callback(err)
        }
        return callback(null, result)
    })
}

const editgetdocument = (id, callback) =>{
    const  query = `SELECT name AS document_name, type FROM documents WHERE id = ?;`
    db.query(query, [id], (err, result) => {
        if(err){
            return callback(err)
        }
        return callback(null, result)
    })
}
 const editdocument = ( id ,data, callback) =>{ 
    const query = `UPDATE documents SET name = ?, type = ? WHERE id = ?;`
    db.query(query, [data.document_name, data.type, id], (err, result) => {
        if(err){
            return callback(err)
        }
        return callback(null, result)
    })
}

const addnewdocument = (data, callback) =>{
    const query = `INSERT INTO documents (name, type) VALUES (?, ?);`
    db.query(query, [data.document_name, data.type], (err, result) => {
        if(err){
            return callback(err)
        }
        return callback(null, result)
    })
} 

const deletedocument = (id, callback) =>{
    const query = `DELETE FROM documents WHERE id = ?;`
    db.query(query, [id], (err, result) => {
        if(err){
            return callback(err)
        }
        return callback(null, result)
    })
}
module.exports = {
    getDocuments,   
    editgetdocument, editdocument , addnewdocument , deletedocument
}