const express=require('express')
const router=express.Router()
const RFIDCardModel=require('../models/RFIDModels')
const authMiddleware=require('../middleware/authMiddleware')


router.post('/add',async(req,res)=>{
    const rfidtag = req.body.rfid
    try{
        const rfidcard = await RFIDCardModel.findOne({RFID:rfidtag});
        if(rfidcard){
            return res.status(401).send("RFID Sudah terdaftar"); 
        }
        const RFID = rfidtag;
        const status = "belum digunakan";
        try{
            let rfid;
            rfid = new RFIDCardModel({
                RFID,
                status,
            });
            await rfid.save();
            return res.status(200).send("Berhasil Input RFID");
        }catch(error){
            console.error(error);
            return res.status(500).send('Server Error');
        }
    } catch(error){
        console.error(error);
        return res.status(500).send('Server Error');
    }
});

router.get('/get',authMiddleware,async(req,res)=>{
    try {
        const rfidcards=await RFIDCardModel.find().sort({createdAt: -1});
        return res.status(200).json({rfidcards});
    } catch (error) {
        consoele.error(error);
        return res.status(500).send('Server Error');
    }
});

router.delete("/delete/:rfId",authMiddleware,async(req,res) => {
    try {
        const {rfId}  = req.params
        const rfid = await RFIDCardModel.findById(rfId);
        if(!rfid){
            return res.status(404).send("RFID NOT FOUND");
        } 
        await rfid.remove()
        return res.status(200).send('Berhasil dihapus');
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");            
    }
});

module.exports=router