const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const producutSchema =  new Schema({
  name: String,
  price : Number,
  description: String,
  image : String
});

module.exports = mongoose.model('product', producutSchema)
