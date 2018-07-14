const socket = io()

console.log(socket.id)

$(function () {
    let logincontainer = $('#login-container')
    let username = $('#username')
    let login = $('#login')

    let chatcontainer = $('#chat-container')
    chatcontainer.hide()
    let msg = $('#msg')
    let send = $('#send')
    let list = $('#list')

    login.click(function () {
        socket.emit('login', { username: username.val() })
    })

    socket.on('logged-in',(data)=>{
        chatcontainer.show()
        logincontainer.hide()
    })

    send.click(function () {
        socket.emit('sendMessage',{ message: msg.val() })
    })

    socket.on('recMessage', (data) => {
        list.append(`<li>${data.username} : ${data.message} : ${data.timestamp}</li>`)
    })
})