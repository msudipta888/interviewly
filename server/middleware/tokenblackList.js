import { TokenBlacklistModel } from "../database/tokenblacllist.js";
import jwt from 'jsonwebtoken'
export const verifyToken =async (req,res,next)=>{
    const token = req.header('Authorization');
    try {
        if(!token){
            return res.status(401).send({message:'Unauthorized'});
        }
        const blacllistToken =await TokenBlacklistModel.findOne({token});
        if(blacllistToken){
            return res.status(401).json({ msg: "Token has been invalidated. Please log in again." });

        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({ msg: "Unauthorized", error });
    }
}
