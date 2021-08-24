const express=require('express')
const router=express.Router()
const RFIDCardModel=require('../models/RFIDModels')


router.post('/add-RFID/',async(req,res)=>{
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

router.get('/get-all-RFID/',async(req,res)=>{
    try {
        const rfidcards=await RFIDCardModel.find().sort({createdAt: -1});
        return res.status(200).json({rfidcards});
    } catch (error) {
        consoele.error(error);
        return res.status(500).send('Server Error');
    }
});

module.exports=router