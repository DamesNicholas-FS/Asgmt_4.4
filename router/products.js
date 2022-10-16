const express = require("express");
const mongoose = require("mongoose");
const { restart } = require("nodemon");
const product = require("../api/models/product");
const router = express.Router();

//Get
router.get('/',(req,res,next) => {
    product.find({})
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'View All Products',
                product: {
                    name: result.name,
                    company: result.company,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            })
        })
        .catch( err => {
            console.error(err.message);
            res.status(500).json({
                error:{
                    message: err.message,
                }
            })
        })

    // res.json({
    //     message: "Products-GET"
    // })
})

//Post - Write  w/ID
router.post('/',(req,res,next) => {
    
    const newProduct = new product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        company: req.body.company
    })

    // Writing to Database

    newProduct.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Product Was Saved!",
                product: {
                    name: result.name,
                    company: result.company,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            })
        })
        .catch( err => {
            console.error(err.message);
            res.status(500).json({
                error:{
                    message: err.message,
                }
            })
        })
    
    // res.json({
    //     message: "Products-POST"
    // })
})

//Get with ID - Read w/ID
router.get('/:productId', (req,res,next) =>{
    const productId = req.params.productId;
    
    product.findOne({productId})
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Found: ' + result.name,
                product: {
                    name: result.name,
                    company: result.company,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            })
        })
        .catch( err => {
            console.error(err.message);
            res.status(500).json({
                error:{
                    message: err.message
                }
            })
        })

    // res.json({
    //     message: "Products-GET ID",
    //     id: productId,
    // })
})

//Patch by ID - Update
router.patch('/:productId', (req,res,next) => {
    const productId = req.params.productId;
    
    const updateProduct = {
        name: req.body.name,
        company: req.body.company
    }

    product.updateOne({
        _id:productId,
    }, {
        $set: updateProduct
    }).then( result => {
        res.status(200).json({
            message: 'Updated Product',
            product: { 
                name: result.name,
                company: result.company,
                id: result._id
            },
            metadata:{
                host: req.hostname,
                method: req.method,
            }
        })
    })
    .catch( err => {
        res.status(500).json({
            error:{
                message: err.message,
            }
        })
    });
    
    // res.json({
    //     message: 'Products-PATCH',
    //     id: productId,
    // })
})

//Delete by ID - Delete
router.delete('/:productId', (req,res,next) => {
    const productId = req.params.productId;

    product.deleteOne({productId})
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Item was Deleted Successful!',
                product:{
                    name: result.name,
                    company: result.company,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            })
        })
        .catch( err => {
            console.error(err.message);
            res.status(500).json({
                error:{
                    message: err.message
                }
            })
        })

    // res.json({
    //     message: 'Products-DELETE',
    //     id: productId,
    // })
})

module.exports = router