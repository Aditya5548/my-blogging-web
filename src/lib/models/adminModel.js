import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
    userid:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    sessionid:{type:String,required:false},
},
{ timestamps : true}
)
const adminModel =mongoose.models.AdLoginid || mongoose.model('AdLoginid',Schema)
export default adminModel;