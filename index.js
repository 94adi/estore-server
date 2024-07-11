const express = require('express');
const productCategories = require('./routes/productCategories');
const products = require('./routes/products');
const cors = require('cors');
const PORT = 5001;

const app = express();


app.use(cors());

app.use('/productCategories', productCategories);

app.use('/products', products);

const serve = app.listen(PORT, () =>{
    console.log('App is running on the port 5001');
});