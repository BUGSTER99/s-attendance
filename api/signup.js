const express=require('express')
const router=express.Router()
const UserModel=require('../models/UserModel')
const ProfileModel=require('../models/ProfileModel')
const jwt=require('jsonwebtoken')
const bycrypt=require('bcryptjs')
const isEmail=require('validator/lib/isEmail')
const regexRFID = /^\d+$/;
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";

router.get('/:rfid',async(req,res)=>{
    const {rfid}=req.params
try{
    if(rfid.length<1)return res.status(401).send('Invalid')
    const user=await UserModel.findOne({rfid: rfid})
    if(user) return res.status(401).send("Username already taken")

    return res.status(200).send("Available");
} catch(error){
    console.error(error);
    return res.status(500).send('Server Error');
}
});

router.post('/',async(req,res)=>{
    const {
        name,
        email,
        rfid,
        password,
    } = req.body.user;

    if(!isEmail(email))return res.status(401).send('Invalid');
    if(password.length < 6){
        return res.status(401).send('Password harus lebih dari 6 karakter');
    }
    try{
        let user;
        user=await UserModel.findOne({email:email.toLowerCase()})
        if(user){
            return res.status(401).send("User telah terdaftar"); 
        }
        user = new UserModel({
            name,
            email:email.toLowerCase(),
            rfid,
            password,
            profilePicUrl:req.body.profilePicUrl||userPng
        });
        user.password = await bycrypt.hash(password,10)
        await user.save();

        let profileFields = {};
        profileFields.user = user._id;

        await new ProfileModel(profileFields).save();
        
        const payload={userId:user._id}
        jwt.sign(payload,process.env.jwtSecret,{expiresIn:"2d"},(err,token)=>{
            if(err)throw err;
            res.status(200).json(token)
        })
    }catch(error){
        console.error(error);
        return res.status(500).send('Server Error');
    }
})

module.exports=router