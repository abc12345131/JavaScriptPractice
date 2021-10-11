const MessageModel = require('../models/MessageModel')
const { CLIENT_ADDRESS } = require('../config/config')

module.exports = function(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: CLIENT_ADDRESS,
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', (socket) => {
        console.log('socketIO connected, id:', socket.id)

        socket.on('sendMsg', ({from, to, content}) => {
            console.log('Server received message from client', {from, to, content})
            const chat_id = [from, to].join('_')
            MessageModel.create({from, to, content, chat_id})
                .then(message => {
                    //private message need the socket.id of receiver
                    //socket.to(receiverSocketId).emit('receiveMsg', socket.id, message)
                    io.emit('receiveMsg', message)
                    console.log('Server send message to client', message)
                })
                .catch(error => {
                    console.error('Add message exception', error)
                    res.send({status: 1, msg: 'Add message exception, please try again!'})
                })
        })
    })
}

