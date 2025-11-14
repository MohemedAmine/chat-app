const mongoose = require('mongoose')
const Chat = require('./chat.model').Chat
const DB_URL ='mongodb://localhost:27017/chat-app'

const userSchema = mongoose.Schema({
    username : String , 
    email :String ,
    password : String,
    verified: Boolean ,
    image : {type:String , default : "default-user-image.png"} , 
    isOnline : {type : Boolean , default : false} , 
    friends : {type : [{name :String,image:String,id:String ,chatId : String }] , default :[]},
    friendRequests : {type : [{name :String,id:String }] , default :[]},
    sentRequests : {type : [{name :String,id:String }] , default :[]}
})

const User = mongoose.model('user' , userSchema)
exports.getUserData = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            User.findById(id).then(data=>{
     
                resolve(data)
            }).catch((err)=>{
                
                reject(err)
            })
        })
    })
}


exports.sendFriendRequest = async (data)=>{
     // add my data to friend friendRequests
     // add friend data to my sentRequests
     try {
        await mongoose.connect(DB_URL)
     await User.updateOne({_id :data.friendId},{$push :{friendRequests : {name : data.myName , id:data.myId}} })
     await User.updateOne({_id :data.myId},{$push :{sentRequests : {name : data.friendName , id:data.friendId}} })
 
     return
     } catch (error) {
         
           throw new Error(error)
     }
}
exports.cancelFriendRequest = async (data)=>{
    // remove my from friend friendRequests
    // remove friend from  my sentRequests
    try {
       await mongoose.connect(DB_URL)
    await User.updateOne({_id :data.friendId},{$pull :{friendRequests : {id:data.myId}} })
    await User.updateOne({_id :data.myId},{$pull :{sentRequests : {id:data.friendId}} })

    return
    } catch (error) {
         
          throw new Error(error)
    }
}
exports.acceptFriendRequest = async (data)=>{
           // remove friend from my friendRequests
           // remove my from  friend sentRequests
           // add my data to friend friends
           // add friend data to my friends
           try {
            await mongoose.connect(DB_URL)
            await User.updateOne({_id :data.friendId},{$pull :{sentRequests : {id:data.myId}} })
            await User.updateOne({_id :data.myId},{$pull :{friendRequests : {id:data.friendId}} })
            let newChat = new Chat({
                users : [data.myId,data.friendId]
            })
            let chatDoc = await newChat.save()
            await User.updateOne({_id :data.friendId},{$push :{friends : {name : data.myName ,image:data.myImage , id:data.myId,chatId:chatDoc._id}} })
            await User.updateOne({_id :data.myId},{$push :{friends : {name : data.friendName ,image:data.friendImage , id:data.friendId,chatId:chatDoc._id}} })

    
         return
         } catch (error) {
              
               throw new Error(error)
         }

}
exports.rejectFriendRequest = async (data)=>{
              // remove friend from my friendRequests
             // remove my from  friend sentRequests
           try {
            await mongoose.connect(DB_URL)
            await User.updateOne({_id :data.friendId},{$pull :{sentRequests : {id:data.myId}} })
            await User.updateOne({_id :data.myId},{$pull :{friendRequests : {id:data.friendId}} })
    
         return
         } catch (error) {
              
               throw new Error(error)
         }
}
exports.deleteFriend = async(data)=>{
        // remove friend from my friend
        // remove my from  friend friend
             try {
                await mongoose.connect(DB_URL)
                await User.updateOne({_id : data.friendId},{$pull :{friends : {id:data.myId}} })
                await User.updateOne({_id :data.myId},{$pull :{friends : {id:data.friendId}} })
                
             return
             } catch (error) {
                 
                   throw new Error(error)
             }


}



exports.getFriendRequests = async id=>{
    try {
        await mongoose.connect(DB_URL)
        let data = await User.findById(id,{friendRequests : true})

        return data.friendRequests
    } catch (error) {
   
        throw new Error(error)
    }

}
exports.getFriends = async id=>{
    try {
        await mongoose.connect(DB_URL)
        let data = await User.findById(id,{friends : true})
        return data.friends
    } catch (error) {
        
        throw new Error(error)
    }

}
exports.User = User