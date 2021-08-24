const express=require('express')
const router=express.Router()
const UserModel=require('../models/UserModel')
const AttendanceModel=require('../models/AttendanceModel')
const jwt=require('jsonwebtoken')


router.post('/',async(req,res)=>{
    const rfidtag=req.body.rfid
try{
    const users = await UserModel.findOne({rfid:rfidtag});
    if(!users){
        return res.status(401).send("RFID tidak terdaftar"); 
    }
    try{
        const user = users._id;
        const keterangan = "masuk";
        const status = "masuk";
        let attendance;
        attendance = new AttendanceModel({
            user,
            keterangan,
            status,
        });
        await attendance.save();
        return res.status(200).send("Berhasil Absen");
    }catch(error){
        console.error(error);
        return res.status(500).send('Server Error');
    }
} catch(error){
    console.error(error);
    return res.status(500).send('Server Error');
}
});



module.exports=router