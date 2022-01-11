const mongoose = require('mongoose');
const Schema = mongoose.Schema

const menuSchema = new Schema({
      
    images: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    avalibility: { type: String, required: true },
    timing: { type: String, required: true },
    foodtype: { type: String, required: true },
    quantity: { type: String, required: true },
    redyTime: { type: String, required: true },
    vendorName: { type: String, required: true },
    category: { type: String, required: true }

})

module.exports = mongoose.model('menu', menuSchema)

