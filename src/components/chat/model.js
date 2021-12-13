const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
    /*chat:{
        type: Schema.ObjectId,
        ref: 'Chat'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'

    },*/
    usuario:{
        type: Schema.ObjectId,
        ref: 'Personales'
    },
    friend:{
        type: Schema.ObjectId,
        ref: 'Personales'
    },
    date:Date//,
    //file:String
})
const model = mongoose.model('Conver',mySchema)
module.exports = model