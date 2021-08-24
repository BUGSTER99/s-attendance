const express=require('express')
const router=express.Router()
const UserModel=require('../models/UserModel')
const AttendanceModel=require('../models/AttendanceModel')
const jwt=require('jsonwebtoken')


router.get('/:rfidtag',async(req,res)=>{
    const {rfidtag}=req.params
try{
    const users = await UserModel.findOne({rfid:rfidtag});
    if(!users){
        return res.status(401).send("RFID tidak terdaftar"); 
    }

    const {name} = users;

    try{
        let attendance;
        attendance = new AttendanceModel({
            name
        });
        await attendance.save();
    }catch(error){
        console.error(error);
        return res.status(500).send('Server Error');
    }
    const payload={userId:users._id}
    jwt.sign(payload,process.env.jwtSecret,{expiresIn:"2d"},(err,token)=>{
        if(err)throw err;
        res.status(200).json("Berhasil Absen");
    })  
} catch(error){
    console.error(error);
    return res.status(500).send('Server Error');
}
});



module.exports=router