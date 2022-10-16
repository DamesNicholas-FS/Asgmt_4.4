const express = require("express");
const router = express.Router();

router.get('/',(req,res, next) => {
    res.json({
        message: "Companies-GET"
    })
})

router.post('/',(req,res,next) => {
    res.json({
        message: "Companies-POST"
    })
})

router.get('/:companiesId', (req,res,next) =>{
    const companiesId = req.params.companiesId;
    res.json({
        message: "Companies-GET ID",
        id: companiesId,
    })
})

router.patch('/:companiesId', (req,res,next) => {
    const companiesId = req.params.companiesId;
    res.json({
        message: 'Companies-PATCH',
        id: companiesId,
    })
})

router.delete('/:companiesId', (req,res,next) => {
    const companiesId = req.params.companiesId;
    res.json({
        message: 'Companies-DELETE',
        id: companiesId,
    })
})

module.exports = router