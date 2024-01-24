import jwt from "jsonwebtoken";
import asynchHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect Routes 
const protect = asynchHandler(async(req,res,next)=>{
    let token;

    //Read the JWT from the cookie
    token = req.cookies.jwt;

    if(token) {
        try{
           const decoded = jwt.verify(token, process.env.JWT_secret) 
           req.user = await User.findById(decoded.userId).select('-password')
           next();

        } catch(error){
        console.log(error)
        req.status(401);
        throw new Error('Not Authorized, token failed');
        }


    }else{
        res.status(401);
        throw new Error('Not Authorized, no token')
    }

})

// Admin middleware 

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401);
        throw new Error('Not Authorized, no token')
    }
}

export {protect, admin}
