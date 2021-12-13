const Model = require('./model')


async function addUser(user){
    console.log("await")
    
    const myUser = new Model(user)
    //console.log(myUser)
    await myUser.save()
    /*await myUser.save()*/

}
async function getUser(filterUser,password){
    let filter = {}
    if(filterUser != null){
        filter = {user:filterUser,password:password}
    }
    const messages = await Model.find(filter)
    return messages
}

async function updateUser(id,user,message) {
    const foundUser = await Model.findOne({ _id: id })
    foundUser.user = user
    foundUser.message = message
    const newMessage = foundUser.save()
    return newMessage
}

function deleteUser(id) {
    return Model.deleteOne({
        _id: id
    })
}


module.exports ={
    add: addUser,
    list:getUser,
    update:updateUser,
    delete:deleteUser
}