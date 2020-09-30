const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
router.get('/', (req, res) => {
  res.send('api works');
});
const db = 'mongodb://niket:Niket856@ds051575.mlab.com:51575/niket';
// const db = 'mongodb+srv://niket:Niket856@cluster0.wywgb.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
  if (err) {
    console.log(err);
  }
});

router.get('/products', (req, res) => {
  Product.find({})
    .exec((err, products) => {
      if (err) {
        console.log(err);
      } else {
        console.log(products)
        res.json(products)
      }

    })
});

router.post('/product', (req, res) => {
  console.log(req);
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = req.body.image;
  product.description = req.body.description;
  product.save((err, product)=> {
    if (err) {
      console.log(err)
    } else {
      res.json(product);
    }
  });
});

router.delete('/product/:id', (req,res)=>{
Product.findByIdAndRemove(req.params.id, (err,deletedProduct)=>{
  if(!err){
    res.json(deletedProduct);
  }
})
});
module.exports = router;
