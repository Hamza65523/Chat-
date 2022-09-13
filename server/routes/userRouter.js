const {register,login,setAvatar,getAllUsers}  = require('../Controllers/userControllers')
const router = require('express').Router()
router.post('/register',register)
router.post('/login',login)
router.post('/setAvatar/:id',setAvatar)
router.get("/allusers/:id",getAllUsers)
module.exports = router