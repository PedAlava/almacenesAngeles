const storage = require('./storage')
function addUser(user,firstname,lastname,password) {
    return new Promise(function (resolve, reject) {
        
       if (!user || !firstname || !lastname || !password ) {
            console.log('[Message Controller] No hay usuario o mensaje')
            return reject('Los datos son incorrectos')
        } else {
            const fullMessage = {
                user: user,
                firstname: firstname,
                lastname:lastname,
                password:password,
                date: new Date()
            }
            console.log("Lista")
            //console.log(fullMessage)
            storage.add( fullMessage)

            return resolve(fullMessage)
        }
    })
}
function getUser(User,Password){
    return new Promise((resolve,reject)=>{
        resolve(storage.list(User,Password))
    })
}
module.exports = {
    addUser,
    getUser
}