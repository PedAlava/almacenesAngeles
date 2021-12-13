//const db = require('mongoose')
const Model = require('./model')
//const storage = require('../auth/storage')
/*const url = "mongodb+srv://ANAcaicedo13:ANAcaicedo13@cluster0.79a1c.gcp.mongodb.net/ups?retryWrites=true&w=majority"
db.Promise = global.Promise
db.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'ups'
})
.then(()=> console.log('db Coneccion exitosa'))
.catch((error)=> console.log('db Problemas con la conecxxion',error))

const list = []
*/
function addMessage(message){
    const myMessage = new Model(message)
    myMessage.save()
}
async function getMessage(filterUser){
    return new Promise((resolve,reject)=>{
        let filter = {}
        if(filterUser != null){
            filter = {user:filterUser}
        }
        Model.find(filter)
            .populate('user')
            .exec((error,populated)=>{
                if (error) {
                    return reject(error)
                    
                }
                resolve(populated)
            })
    
    })


    
}
async function updateMessage(id,message){
    const foundmessages = await Model.findOne({_id:id})
    foundmessages.message = message
    const newMessage = foundmessages.save()
    
    return newMessage
}

function deleteMessage(id) {
    return Model.deleteOne({
        _id: id
    })
}

module.exports ={
    add: addMessage,
    list:getMessage,
    update:updateMessage,
    delete: deleteMessage
}