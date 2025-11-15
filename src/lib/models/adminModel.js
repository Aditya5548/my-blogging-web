import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
    userid:{type:String, required:true,unique:true},
    password:{type:String,required:true},
},
{ timestamps : true}
)
const AdminModel =mongoose.models.AdLogin|| mongoose.model('AdLogin',Schema)
export default AdminModel;