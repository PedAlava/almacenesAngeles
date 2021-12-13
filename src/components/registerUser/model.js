const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    user:String,
    firstname: String,
    lastname: String,
    password: String,
    date:Date
})


const model = mongoose.model('Usuarios',mySchema)
module.exports = model