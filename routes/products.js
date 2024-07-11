const express = require('express');

const products = express.Router();

const pool = require('../shared/pool');

products.get('/',(req,resp) =>{

    let mainCategoryId = req.query.mainCategoryId;
    let subCategoryId = req.query.subCategoryId;
    let keyword = req.query.keyword;

    let query = 'select * from products';

    if(subCategoryId){
        query += ' where category_id = ' + subCategoryId;
    }

    if(mainCategoryId){
        query = 'select products.* from products, categories where products.category_id = categories.id and categories.parent_category_id = '+ mainCategoryId;
    }

    if(keyword){
        query += ` and keywords like '%${keyword}%'`;
    }

    pool.query(query, (error, products) =>{
        if(error){
            resp.status(500).send(error);
        }
        else{
            resp.status(200).send(products);
        }
    });
});

products.get('/(:id)', (req,resp) =>{
    const id = req.params.id;
    pool.query('select * from products WHERE id=' + id, (error, products) =>{
        if(error){
            resp.status(500).send(error);
        }
        else{
            resp.status(200).send(products);
        }
    });
});

module.exports = products;