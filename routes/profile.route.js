const express = require('express');
const router = express.Router();
const authGuard = require('./guards/auth.guard')
const profileController = require('../controllers/profile.controller')
  
router.get('/',authGuard.isAuth,profileController.redirect)
router.get('/:id',authGuard.isAuth,profileController.getProfile)

  module.exports = router;