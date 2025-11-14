const express = require('express');
const router = express.Router();
const authGuard = require('./guards/auth.guard')
const groupController = require('../controllers/group.controller')
const check = require('express-validator').check
const multer = require('multer')

  

router.get("/create", authGuard.isAuth, groupController.getCreateGroup);
router.post("/create",authGuard.isAuth,multer({
    storage : multer.diskStorage({
           destination : (req , file ,cb)=>{
            cb(null,'images')
           },
           filename : (req , file, cb)=>{
            cb(null,Date.now() + '-' + file.originalname)
           }
    }), 

   }).single('image'),
     check('image').custom((value , {req})=>{
             if(req.file) return true 
             else throw 'Image is required'      


     }),groupController.postCreateGroup);
router.get("/:id", authGuard.isAuth, groupController.getGroup);
router.get("/", authGuard.isAuth, groupController.getUserGroups);
module.exports = router