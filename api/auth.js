const express=require('express')
const router=express.Router()
const UserModel=require('../models/UserModel')
const jwt=require('jsonwebtoken')
const bycrypt=require('bcryptjs')
const isEmail=require('validator/lib/isEmail')
const authMiddleware=require('../middleware/authMiddleware')


router.get('/',authMiddleware, async (req,res) => {
    const { userId }=req;
    try {
        const user=await UserModel.findById(userId);
        return res.status(200).json({user});
    } catch (error) {
        consoele.error(error);
        return res.status(500).send('Server Error');
    }
});

router.post('/',async(req,res)=>{
    const { email, password} = req.body.user;
    if(!isEmail(email))return res.status(401).send('Invalid');
    if(password.length < 6){
        return res.status(401).send('Password harus lebih dari 6 karakter');
    }
    try{
        const user=await UserModel.findOne({email:email.toLowerCase()}).select("+password");
        if(!user){
            return res.status(401).send("Email atau password salah"); 
        }

        const isPassword=await bycrypt.compare(password,user.password)
        if(!isPassword){
            return res.status(401).send("Email satau password salah"); 
        }

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