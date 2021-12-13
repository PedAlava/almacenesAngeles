const use = require('./network')
const storage = require('./storage')
const config = require('../../config')
const socket = require('../../socket')
function addMessage(chat,user, message,file) {
    return new Promise(function (resolve, reject) {
        if (!chat ||!user || !message) {
            console.log('[Message Controller] No hay usuario o mensaje')
            return reject('Los datos son incorrectos')
        } else {
            let fileURL = ''
            if (file) {
                fileURL = config.host + ':' + config.port + config.publicRoute +config.filesRoute +'/' + file.filename
            }
            const fullMessage = {
                chat:chat,
                user: user,
                message: message,
                date: new Date(),
                file: fileURL
            }
            storage.add( fullMessage)
            socket.io.emit('message',fullMessage)
            return resolve(fullMessage)

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