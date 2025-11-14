const mongoose = require('mongoose')
const DB_URL ='mongodb://localhost:27017/chat-app'

const chatSchema = mongoose.Schema({
   users : [{type:mongoose.Schema.Types.ObjectId , ref: 'user' }]
})

const Chat = mongoose.model('chat' , chatSchema)
exports.getChat =async chatId=>{
    try {
        await mongoose.connect(DB_URL) 
        let chat = await Chat.findById(chatId).populate('users')
    
        return chat
     
    
    } catch (error) {
      
        throw new Error(error)
        
    }

}

exports.Chat = Chat