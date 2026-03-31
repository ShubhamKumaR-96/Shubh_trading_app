import {Request,Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";


export const authMiddleware=(req:Request,res:Response,next:NextFunction):void =>{
    try {
        const authHeader=req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(401).json({
                success:false,
                message:"Access denied. No token provided"
            })
            return
        }

        const token=authHeader.substring(7)

        const decoded=verifyToken(token)

        req.user=decoded

        next()
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'Invalid or expired token'
        })
    }
}