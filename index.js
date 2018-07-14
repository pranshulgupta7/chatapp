const Express = require('express')
const Socketio = require('socket.io')
const http = require('http')

const app = Express()
const server = http.createServer(app)
const io = Socketio(server)

nametoid = {}
idtoname = {}


io.on('connection',(socket)=>{
    console.log(socket.id)

    socket.on('login',(data)=>{
        nametoid[data.username] = socket.id
        idtoname[socket.id] = data.username

        socket.join(data.username)

        socket.emit('logged-in',{success: 'true'})
    })
    
    socket.on('sendMessage',(data)=>{
        console.log('Message recieved: '+ data.message )
        //socket.broadcast.emit('recMessage',{message: data.message})
        //io.emit('recMessage', { message: data.message })
        //socket.emit('recMessage', { message: data.message })

        if(idtoname[socket.id]){
            if(data.message.charAt(0)==='@'){
                let username = data.message.split(' ')[0].substring(1)
                let msgArray = data.message.split(' ')
                msgArray.splice(0,1)
                io.in(username).emit('recMessage', { message: msgArray.join(' '), username: idtoname[socket.id], timestamp: new Date().getTime() })
            }
            else{
                io.emit('recMessage', { message: data.message, username: idtoname[socket.id], timestamp: new Date().getTime() })
            }
        }

        

        // io.to(socket.id).emit('recMessage', { message: data.message, username: data.username, timestamp: new Date().getTime() })
    })

})



app.use('/',Express.static(__dirname + '/public'))

server.listen(3333,()=>{
    console.log('Server started at http://localhost:3333')
})