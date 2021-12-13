const use = require('./network')
const storage = require('./storage')
const config = require('../../config')
const socket = require('../../socket')
function addMessage(user,friend) {
    return new Promise(function (resolve, reject) {
        if (!friend ||!user ) {
            console.log('[Message Controller] No hay usuario o Amigo')
            return reject('Los datos son incorrectos')
        } else {

            const fullFriend = {
                usuario:user,
                friend: friend,

                date: new Date()
            }
            storage.add( fullFriend)
            return resolve(fullFriend)

        }
    })
}
function getMessages(filterUser){
    return new Promise((resolve,reject)=>{
        resolve(storage.list(filterUser))
    })
}
function updateMessage(id,message){
    //const foundmessages = await Model.findOne({id:id})
    //foundmessages.message = foundmessages.save()
    return new Promise( async (resolve,reject)=>{
        if(!id || !message){
            return  reject('Data Invalida')
            
        }
        const result = await storage.update(id,message)
        return resolve(result)
    })
    //return foundmessages
}
function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            return reject('Id inválido.')
        }
        const result = storage.delete( id )
        return resolve( result )
    })
}
module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}