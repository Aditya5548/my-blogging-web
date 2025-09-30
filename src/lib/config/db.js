import mongoose from "mongoose";
export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://yadityakumar205:Adi123@cluster0.uhzmrkd.mongodb.net/Blog_Website')
    console.log("DB Connected.....")
}