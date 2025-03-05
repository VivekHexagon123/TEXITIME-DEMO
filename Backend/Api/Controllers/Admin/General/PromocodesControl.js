const promocodesmodel = require('../../../Models/Admin/General/PromocodesModel')

const getPromocodes = (req, res) => {
    promocodesmodel.getPromocodes((err, result) => {
        if(err) {
            res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send(result);
        }
    });
}

const editgetpromocode = (req, res) => {
    const id = req.params.id;
    promocodesmodel.editgetpromocode(id, (err, result) => {
        if(err) {
            res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send(result);
        }
    });
}
const updatePromocode = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    console.log(req.body);
    
    promocodesmodel.updatePromocode( id ,data, (err, result) => {
        if(err) {
           return res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send({
                message: 'Promocode updated successfully',
                data: result
            });
        }
    });
}

const addPromocode = (req, res) => {
    const data = req.body;
    console.log(req.body);
    promocodesmodel.addPromocode(data, (err, result) => {
        if(err) {
           return res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send({
                message: 'Promocode added successfully',
                data: result
            });
        }
    });
}
const deletePromocode = (req, res) => {
    const id = req.params.id;
    promocodesmodel.deletePromocode(id, (err, result) => {
        if(err) {
            res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send({
                message: 'Promocode deleted successfully',
                data: result
            });
        }
    });
}
module.exports = {
    getPromocodes,
    editgetpromocode,
    updatePromocode ,
    deletePromocode ,
    addPromocode
}

