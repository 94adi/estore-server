const express = require('express');

const productCategories = express.Router();

const mysql = require('mysql2');

const PORT = 5001;

const pool = mysql.createPool({
    host: '<host>',
    user: '<user>',
    password: '<password>',
    database: '<database>',
    port: 'port',
    multipleStatements: true
});

productCategories.get('/', (req,res) =>{
    
    pool.query('select * from categories', (error, categories) =>{
        if(error){
            res.status(500).send(error);
        }
        else{
            res.status(200).send(categories);
        }
    })
});

module.exports = productCategories;