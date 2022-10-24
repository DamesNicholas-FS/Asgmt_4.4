//All Imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const companies = require('../router/companies')
const product = require('../router/products')
const mongoose = require('mongoose');
require('dotenv').config();

//Middleware logging (Morgan)
app.use(morgan("dev"));

//parsing middleware
app.use(express.urlencoded({
    extended: true
}));
//Middleware Json
app.use(express.json());

//Middleware for CORS policy
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","POST, PUT, GET, PATCH, DELETE")
    }
    next();
})

// Normal Get
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Service is Up!',
        method: req.method,
})});

//LocaHost post /
app.use('/company', companies);
app.use('/product', product)

//error handling
app.use((req, res, next) => {
    const error = new Error ("Not Found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error:{
            message: error.message,
            status: error.status,
            method: req.method
        }
    })
});

mongoose.connect(process.env.mongooseURL, (err) => {
    if (err) {
        console.error("Error: ",err.message);
    } else {
        console.log('MongoDB Connection was successful');
    }
})


module.exports = app;