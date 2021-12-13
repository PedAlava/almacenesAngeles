const express = require('express')
const user = require('../components/user/network')
const index = require('../components/index/network')
const register = require('../components/registerUser/network')

const logout = require('../components/logout/network')
const dashboard = require('../components/dashboard/network')
const items = require('../components/items/network')
const createItems = require('../components/createItems/network')
const createCostumers = require('../components/createCostumers/network')
const costumers = require('../components/costumers/network')

const message = require('../components/message/network')

const chats = require('../components/chat/network')
const zone = require('../components/zone/network')
const createZone = require('../components/createZone/network')
const createInvoice = require('../components/createInvoice/network')


const routes = function (server) {
    server.use('/', index)
    server.use('/user', user)
    server.use('/register', register)
    server.use('/logout', logout)
    server.use('/dashboard', dashboard)
    server.use('/items', items)
    server.use('/createItems', createItems)
    server.use('/costumers', costumers)
    server.use('/createCostumers', createCostumers)
    server.use('/message', message)
    server.use('/chats', chats)
    server.use('/zone', zone)
    server.use('/createZone', createZone)
    server.use('/createInvoice', createInvoice)
    
    
}

module.exports = routes