import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
    userid:{type:String, required:true},
    password:{type:String},
    
})
const EmailModel =mongoose.models.Subscriptions || mongoose.model('Subscriptions',Schema)
export default EmailModel;