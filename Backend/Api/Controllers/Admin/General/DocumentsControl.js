const documentsmodel = require('../../../Models/Admin/General/DocumentsModel');

const getDocuments = (req, res) => {
    documentsmodel.getDocuments((err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
}   
const editgetdocuments = (req, res) => {
const  id = req.params.id;
    documentsmodel.editgetdocument(id, (err, result) => {
        if(err){
            res.send(err);
        }    
        res.send(result);
    });
}

const updatedocument = (req, res) => {
    const id = req.params.id;
    const{document_name , type} = req.body;
    console.log(req.body);
    documentsmodel.editdocument( id ,{document_name , type}, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
}

const addnewdocument = (req, res) => {    
    const{document_name , type} = req.body;
    documentsmodel.addnewdocument({document_name , type}, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
}    

const deletedocument = (req, res) => {
    const id = req.params.id;
    documentsmodel.deletedocument(id, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
}
module.exports = {
    getDocuments ,
    editgetdocuments ,updatedocument , addnewdocument , deletedocument
}
    