const ReviewModel = require('../../../Models/Admin/Review/Review');

const userReview = (req, res) => {
    ReviewModel.getuserReview((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message || 'Database error' }); 
        }
        return res.status(200).json({ message: 'Success', result }); 
    }); 
};  

const ProviderReview = (req, res) => {        
    ReviewModel.getproviderReview((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message || 'Database error' }); 
        }
        return res.status(200).json({ message: 'Success', result }); 
    }); 
};

module.exports = { userReview, ProviderReview };