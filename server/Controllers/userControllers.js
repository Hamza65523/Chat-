const User = require('../model/userModel')
const bcrypt = require('bcrypt')
module.exports.register=async(req,res,next)=>{
   try{
    let data = req.body
    console.log(data,'data')
    const {username,email,password} = data
    const checkUserName = await User.findOne({username})
    if(checkUserName){
        return res.json({msg:"Username is already in used",status:false})
    }
    const checkEmail = await User.findOne({email})
    if(checkEmail){
        return res.json({msg:"Email is already in used",status:false})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        username,
        email,
        password:hashPassword
    })
    delete user.password
    return res.json({status:true,user})
   }catch(err){
    console.log(err)
   }
}
module.exports.login=async(req,res,next)=>{
    console.log(req.body,'test')
    try{
        let data = req.body
    const {username,password} = data
    const user = await User.findOne({username})
    if(!user){
        return res.json({msg:"Invalid Username",status:false})
    }
    const hashPassword = await bcrypt.compare(password,user.password)
    if(!hashPassword){
        return res.json({msg:"Invalid password",status:false})
    }
    delete user.password
    return res.json({status:true,user})
    }catch(err){
        console.log(err)
    }
}

module.exports.setAvatar= async(req,res,next)=>{
    try{
        const userID = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userID,{
            isAvatarImageSet: true,
            avatarImage,
        })
        return res.json({isSet:userData.isAvatarImageSet,
            image:userData.avatarImage})
    }catch(err){
        console.log(err)
    }
}
module.exports.getAllUsers=async(req,res,next)=>{
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users)
    }catch(err){
        console.log(err)
    }
}