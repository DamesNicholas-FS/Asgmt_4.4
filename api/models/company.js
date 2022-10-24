const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    company:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Company', companySchema)