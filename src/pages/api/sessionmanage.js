import { connectDB } from '../../lib/config/db';
import AdminModel from '../../lib/models/AdminModel';

export default async function handler(req, res) {
    await connectDB();
    if (req.method === "GET") {
        const {userid ,sessionid} =req.query
        const admin = await AdminModel.findById(userid);
        if(!admin){
            return res.status(200).json({ success: false, msg: "user not exist"});
        }
        else{
            try {
                if(sessionid === admin.sessionid){
                    return res.status(200).json({ success: true, msg: "session exist"});
                }
                else{
                    return res.status(200).json({ success: false, msg: "Session Expired"});
                }
            } catch (error) {
                console.log(error)
                return res.status(200).json({ success: false, msg: "error occurred"});
            }
            
        }
        
    }
}