const userModel = require("../models/user.model");
exports.getHome=(req,res,next)=>{
    res.render('index',{
        isUser:req.session.userId,
        pageTitle:"Home",
        friendRequests : req.friendRequests,
        myId : req.session.userId
        
    })
}


exports.getFriends = (req,res,next)=>{
  userModel.getFriends(req.session.userId).then(friends=>{
         res.render('friends' , {
            friends : friends , 
            isUser:req.session.userId,
            pageTitle:"Friends",
            friendRequests : req.friendRequests,
            myId : req.session.userId
        })


  }).catch(err=>  res.redirect("/error"))
}