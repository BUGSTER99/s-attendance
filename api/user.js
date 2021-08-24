const express=require('express');
const router=express.Router();
const UserModel=require('../models/UserModel');
const authMiddleware=require('../middleware/authMiddleware');

router.get('/',authMiddleware, async (req,res) => {
    try {
        const allUsers=await UserModel.find().sort({createdAt: -1});
        return res.status(200).json({allUsers});
    } catch (error) {
        consoele.error(error);
        return res.status(500).send('Server Error');
    }
});

router.get('/:userId',authMiddleware, async (req,res) => {
    try {
        const user=await UserModel.findById(req.params.userId);
        if(!user) {
            return res.status(404).send('User not found');
        }
        return res.status(200).json({users});
    } catch (error) {
        consoele.error(error);
        return res.status(500).send('Server Error');
    }
});

router.delete("/delete/:userId",authMiddleware,async(req,res) => {
    try {
        const {userId}  = req.params
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(404).send("User tidak ditemukan");
        } 
        await user.remove()
        return res.status(200).send('Berhasil dihapus');
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");            
    }
});

module.exports=router;