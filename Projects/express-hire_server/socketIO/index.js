const {ChatModel} = require('../models/ChatModel')
const { CLIENT_ADDRESS } = require('../config/config')
module.exports = function(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: CLIENT_ADDRESS,
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', function(socket) {
        console.log('socketIO connected!')

        socket.on('sendMsg', function({from, to, content}) {
            console.log('Server received message', {from, to, content})
            const chat_id = [from, to].join('_')
            ChatModel.create({from, to, content, chat_id})
                .then(chatMsg => {
                    io.emit('receiveMsg', chatMsg)
                    console.log('Server sent message', chatMsg)
                })
                .catch(error => {
                    console.error('Add chatMsg exception', error)
                    res.send({status: 1, msg: 'Add chatMsg exception, please try again!'})
                })
        })
    })
}

