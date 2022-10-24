const express = require("express");
const mongoose = require("mongoose");
const company = require("../api/models/company");
const Company = require("../api/models/company");
const product = require("../api/models/product");
const Messages = require("../messages/messages");
const router = express.Router();

//GET - ✓
router.get('/',(req,res, next) => {
    
    company.find({})
    .select("company _id")
    .populate("product", "company product")
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'View All Companies',
            company: (result)
        })
    })
    .catch( err => {
        console.log(err.message);
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
    
    // res.json({
    //     message: "Companies-GET"
    // })
})

//POST - ✓
router.post('/',(req,res,next) => {
    
    company.find({
        company: req.body.company
    }).exec().then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(400).json({
                message: 'Company Already Exist!'
            })
        }
        const newCompany = new company({
            _id: mongoose.Types.ObjectId(),
            company: req.body.company
        })

        newCompany.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Company Saved!',
                company: {
                    company: result.company,
                    id: result._id,
                    metadata:{
                        method: req.method,
                        host: req.hostname
                    }
                }
            });
        })
        .catch( err => {
            console.log(err.message)
            res.status(500).json({
                error:{
                    message: err.message
                }
            });
        })
    })
})

//GET by Id - ✓
router.get('/:companiesId', (req,res,next) =>{
    const companiesId = req.params.companiesId;
    
    Company.findById(companiesId)
    .select("_id company")
    .populate("product", "company product")
    .exec()
    .then(company => {
        if(!company){
            console.log(company)
            return res.status(404).json({
                message: Messages.company_not_found
            })
        }
        res.status(201).json({
            Company: company
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    })
    
    // res.json({
    //     message: "Companies-GET ID",
    //     id: companiesId,
    // })
})

//Patch by Id - ✓
router.patch('/:companiesId', (req,res,next) => {
    const companiesId = req.params.companiesId;
    
    const updateCompany = {
        company: req.body.company,
    }

    company.updateOne({
        _id: companiesId
    }, {
        $set: updateCompany
    })
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Company Update',
            company: (result),
            metadata:{
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch( err => {
        console.error(err.message)
        res.status(500).json({
            error:{
                message: err.message
            }
        });
    })

    // res.json({
    //     message: 'Companies-PATCH',
    //     id: companiesId,
    // })
})

//Delete by Id - ✓
router.delete('/:companiesId', (req,res,next) => {
    const companiesId = req.params.companiesId;
    
    Company.deleteOne({
        _id: companiesId
    })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:"Company Deleted",
            request:{
                method: "GET",
                url:"http://localhost:3000/company/" + companiesId,
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
    
    // res.json({
    //     message: 'Companies-DELETE',
    //     id: companiesId,
    // })
})

module.exports = router