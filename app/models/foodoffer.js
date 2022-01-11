const mongoose = require('mongoose');
const Schema = mongoose.Schema

const foodSchema = new Schema({
      
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    offers: { type: Number, required: true },
    ven: { type: String, required: true },
    avalibility: { type: String, required: true },
    timing: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: String, required: true },
    vendorName: { type: String, required: true },
    rtype: { type: String, required: true },
    city: { type: String, required: true }

})

module.exports = mongoose.model('foodoffer', foodSchema)

