import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import AdminModel from '../../lib/models/AdminModel';
import { connectDB } from '../../lib/config/db';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { main } from './Send-Email/helper';
const createtoken = (data) => {
    return jwt.sign({ data }, process.env.NEXT_PUBLIC_API_URL);
}

const rateLimiter = new RateLimiterMemory({
  points: 3,  
  duration: 60 * 1,   
});

export default async function handler(req, res) {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    await connectDB();
    if (req.method === "GET") {
        const { userid, password } = req.query
        if (userid && password) {
            try {
                await rateLimiter.consume(ip);
                const rlRes = await rateLimiter.get(ip);
                const usedPoint = rlRes?.consumedPoints || 0;
                const attemptleft =3-usedPoint;
                const admin = await AdminModel.findOne({ userid })
                if (!admin) {
                    return res.status(200).json({ success: false, msg: "Admin not exists" });
                }
                else {
                    const isMatch = await bcrypt.compare(password, admin.password)
                    if (!isMatch) {
                        const msg = `<b>hello ,<br/>Tech-info Admin<b/> <br/> wrong password Entered in your Admin Dashboard.After ${attemptleft} attempt your userid will locked for the 1 minute.<br/> if you are not doing this than just change your password to protect your admin dashboard data. <br/> <br/>thank you <br/> <br/> regards,<br/> Tech Info`
                        main("yadityakumar205@gmail.com","Tech-info Admin Security", msg)
                        return res.status(200).json({ success: false, msg: `incorrect password ${attemptleft} attempts left`});
                    }
                    else {
                        const newsessionid = uuidv4()
                        admin.sessionid=newsessionid;
                        await admin.save()
                        const token = createtoken({
                            userid:admin._id,
                            sessionid:newsessionid,
                        })
                        console.log("token",token)
                        return res.status(200).json({ success: true, authkey: token });
                    }
                }
            }
            catch (e) {
                console.log("Error Message",e)
                return res.status(200).json({ success: false, msg: "Too many failed attempts.Try again after 1 minutes" });
            }
        }
        else {
            return res.status(200).json({ success: false, msg: "All field required" });
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