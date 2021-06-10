import jwt from 'jsonwebtoken'
import user from '../models/UserModel'

module.exports=(req:any,res:any,next)=>{
    const token=req.cookies.token;
    const verifytoken=jwt.verify(token,process.env.SECRET_KEY,async(err,payload)=>{
            if(err)
            {
                return res.status(401).json({error:"you must be logged in...."})
            }
    const {email}=payload
    const myuser=await user.findOne({email})
    req.user=myuser;
    next();
    })
}