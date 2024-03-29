const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
      
    name: { type: String, required: true },
    number: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resturant: {type: String, default: 'no_res'},
    role: { type: String, default: 'coustmer' }

    

}, {timestamps: true })



module.exports = mongoose.model('User', userSchema)