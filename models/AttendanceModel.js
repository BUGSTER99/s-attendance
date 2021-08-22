const mongoose=require('mongoose')
const Schema= mongoose.Schema

const AttendanceSchema=new Schema({
    name:{type:String, required:true},
},
{timestamps: true}
);

module.exports=mongoose.model('Attendance',AttendanceSchema)
