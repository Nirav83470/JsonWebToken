const mongoose = require('mongoose');

const product = new mongoose.Schema({
    title :{ type: String},
    description : { type: String},
    price : { type : Number},
    discountPercentage : { type : Number},
    rating: { type : Number},
    stock: { type : Number},
    brand: { type : String},
    category: { type : String},
    thumbnail: { type : String}
})

const addproduct = mongoose.model('listproduct' , product)

module.exports = addproduct