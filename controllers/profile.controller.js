const userModel = require('../models/user.model')
exports.redirect = (req,res,next)=>{
    res.redirect('/profile/'+req.session.userId);
}



exports.getProfile = (req,res,next)=>{
    
    let id = req.params.id
    userModel.getUserData(id).then((data) => {
        res.render('profile' , {
           
            pageTitle: data.username,
            isUser: req.session.userId,
            friendRequests: req.friendRequests,
            myId: req.session.userId,
            myName: req.session.name,
            myImage: req.session.image,
            friendId: data._id,
            username: data.username,
            userImage: data.image,
            isOwner: id === req.session.userId,
            isFriends: data.friends.find(
                friend => friend.id === req.session.userId
            ),
            isRequestSent: data.friendRequests.find(
                friend => friend.id === req.session.userId
            ),
            isRequestRecieved: data.sentRequests.find(
                friend => friend.id === req.session.userId
            )
        })
        
    }).catch(err=>res.redirect('/error'))

}        

/*
user enter his profile
friends
    user1 is in user2 friends
user1 send friend request to user2
    user1 is in user2 friendRequests
user1 recieved friend request from user2
    user1 is in user2 sendRequests
 



*/