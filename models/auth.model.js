const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./user.model').User;
const userVerification = require('../models/userVerification');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');


const DB_URL = 'mongodb://localhost:27017/chat-app';
mongoose.connect(DB_URL);

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'mohamedamineouledsaid@outlook.com',
        pass: 'ccp39093148'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying transporter:', error);
    } else {
        console.log("Transporter ready for messages");
    }
});

exports.sendVerificationEmail = async ({ _id, email }, res) => {
    const currentUrl = 'http://localhost:3000/';
    const uniqueString = uuidv4() + _id;
    const hashUniqueString = await bcrypt.hash(uniqueString, 10);

    try {
        const newVerification = new userVerification({
            userId: _id,
            uniqueString: hashUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000
        });
        await newVerification.save();

        const mailOptions = {
            from: 'mohamedamineouledsaid@outlook.com',
            to: email,
            subject: 'Verify Your Email',
            text: 'This is an automated email',
            html: `<a href="${currentUrl}verify/${_id}/${uniqueString}">Verify Email</a>`
        };

        await transporter.sendMail(mailOptions);
        
        res.render(`verificationEmailSent`);
       
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).json({
            status: "FAILED",
            message: "Couldn't send verification email"
        });
    }
};


exports.createNewUser = (userName,email,password)=>{
    //check if email exists
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            User.findOne({email : email}).then((user)=>{
                if(user){
      
                    reject('Email is used')
                }
                else{
                  bcrypt.hash(password,10).then((hashedPassword)=>{
                    let newUser = new User({
                        username : userName , 
                        email : email,
                        password : hashedPassword,
                        verified : false
                
                    })
                    newUser.save().then((value)=>{
                   resolve(value)
            }).catch((err)=>{ 
                 reject(err)
            })
                  }).catch((err)=>{
                
                    reject(err)

                  })
        
       
             
    }
}).catch(err=>{ 
    reject(err)
})
                
}).catch(err=>   reject(err))
}   
     )
    }


    exports.login = (email,password)=>{
        // check for email 
        // no ===> error 
        // yes ===> check for password
        // no ===> error
        //yes ===> set session 

        return new Promise((resolve,reject)=>{
            mongoose.connect(DB_URL).then(()=>{
                User.findOne({email : email}).then((user)=>{
                           if(!user){
                               
                               reject('There is no user matches this email')
                           }else{
                                if(!user.verified){
                                    reject('Email is not verified');
                                }else{
                                    bcrypt.compare(password , user.password).then((same)=>{
                                        if(!same){
                                     
                                           reject('Password is incorrect')
                                        }else{
                                           resolve(user)
                                        }
                              }) 
                                }
                               
                           }
            }).catch((err)=> {
              
                reject(err)

            })

        }).catch((err)=>reject(err))

    })}




exports.getEmailByid =(id)=>{
    return new Promise ((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            User.findOne({_id : id}).then((user)=>resolve(user.email)).catch((err)=>reject(err))
        }).catch((err)=>reject(err))
    })
}
