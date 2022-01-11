const mongoose = require('mongoose');
const Schema = mongoose.Schema

const offerSchema = new Schema({
      
    code: { type: String, required: true },
    sentence: { type: String, required: true },
    discount: { type: Number, required: true },
    details: { type: String, required: true },
    more: { type: String, required: true }
    

})



module.exports = mongoose.model('offer', offerSchema)
