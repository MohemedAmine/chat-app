const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)        
const flash = require('connect-flash');
const socketIO = require('socket.io')
const authRouter = require('./routes/auth.route')
const homeRouter =  require('./routes/home.route')
const profileRouter = require('./routes/profile.route')
const friendRouter = require('./routes/friend.route')
const chatRouter   = require('./routes/chat.route')
const groupRouter   = require('./routes/group.route')
const getFriendRequests = require('./models/user.model').getFriendRequests
const io = socketIO(server)
io.onlineUsers = {}
require('./sockets/friend.socket')(io)
require('./sockets/init.socket')(io)
require('./sockets/chat.socket')(io)
require('./sockets/group.socket')(io)

app.use(express.static(path.join(__dirname ,'assets')))
app.use(express.static(path.join(__dirname ,'images')))
app.use(flash())

const STORE = new SessionStore({
    uri:'mongodb://localhost:27017/chat-app',
    collection : 'sessions'
})
app.use(session({
    secret : 'This is my secret to hash express sessions ......',
    saveUninitialized : false ,
    resave: false, 
    store : STORE
}))
app.set('view engine' , 'ejs')
app.set('views','views');//Default 

app.use((req,res,next)=>{
    if(req.session.userId){
        getFriendRequests(req.session.userId).then(requests=>{
             req.friendRequests = requests
             next()
        }).catch(err=>res.redirect('/error'))
    }else{
        next()
    }
})

app.use('/',authRouter)
app.use('/',homeRouter)
app.use('/profile' ,profileRouter)
app.use('/friend',friendRouter)
app.use('/chat',chatRouter)
app.use('/groups',groupRouter)

app.get('/error' ,(req,res,next)=>{
    res.status(500)
    res.render('error',{
        isUser : req.session.userId, 
        friendRequests : req.friendRequests,
        pageTitle : "Error"
     })})
app.use((err,req,res,next)=>{
    res.redirect('/error')
})
app.use((req,res,next)=>{
    res.status(404)
    res.render('not-found',{
        isUser : req.session.userId, 
        friendRequests : req.friendRequests,
        pageTitle : "Page Not Found",
        myId : req.session.userId
     })
})
const port = process.env.PORT || 3000
server.listen( port, () => {
    console.log('Server listen on port '+port );
});
