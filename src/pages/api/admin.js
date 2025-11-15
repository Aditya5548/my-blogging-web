import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AdminModel from '../../lib/models/AdminModel';
import { connectDB } from '../../lib/config/db';
const createtoken = (id) => {
    return jwt.sign({ id }, process.env.NEXT_PUBLIC_API_URL);
}
export default async function handler(req, res) {
    await connectDB();
    if (req.method === "GET") {
        const { userid, password } = req.query
        if (userid && password) {
            const admin = await AdminModel.findOne({ userid })
            if (!admin) {
                return res.status(200).json({ success: false, msg: "Admin not exists"});
            }
            else {
                const isMatch = await bcrypt.compare(password, admin.password)
                if (!isMatch) {
                    return res.status(200).json({ success: false, msg: "incorrect password" });
                }
                else {
                    const token = createtoken(admin._id)
                    return res.status(200).json({ success: true, authkey: token });
                }
            }    
        } 
        else {
            return res.status(200).json({ success: false, msg: "All Field required"});
        }
    }

    if (req.method === 'POST') {
        if (req.body.userid && req.body.password && req.body.secretkey === "8869") {
            try {
                const salt = await bcrypt.genSalt(10)
                const hashedpassword = await bcrypt.hash(req.body.password, salt)
                const data = {
                    userid: req.body.userid,
                    password: hashedpassword,
                }
                const newuser = new AdminModel(data)
                newuser.save()
                return res.status(200).json({ success: true, msg: "Admin Added Successfully" });
            }
            catch (error) {

                return res.status(200).json({ success: false, msg: "duplicate id" });
            }
        }
        else {
            return res.status(200).json({ success: false, msg: "All Field required" });
        }
    }
}