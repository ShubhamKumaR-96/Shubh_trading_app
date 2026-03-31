import { NextFunction,Request,Response } from "express";
import { getCurrentUser, loginUser, registerUser } from "../services/auth.service";

export const register=async(req:Request,res:Response):Promise<void>=>{

    try {
        const {email,name,password}=req.body

        if(!email || !name || !password){
            res.status(400).json({
                success:false,
                message:"Name, email and password are required"
            })
            return
        }
        if(password.length < 6){
            res.status(400).json({
                successs:false,
                message:"Password must be at least 6 characters"
            })
            return
        }

        const result=await registerUser(name,email,password)

        res.status(201).json({
            success:true,
            message:"Registration Successful",
            data:result
        })


    } catch (error) {
        const message=error instanceof Error ? error.message:'Registration failed'
        res.status(400).json({
            success:false,
            message
        })
    }

}

export const login=async(req:Request,res:Response):Promise<void>=>{

    try {
        const {email,password}=req.body

        if(!email || !password){
        res.status(400).json({
            success:false,
            message:"Email and Password are required"
        })
        return
    }

        const result=await loginUser(email,password)
        res.status(201).json({
            success:true,
            message:"Login successful",
            data:result
        })
    } catch (error) {
        const message= error instanceof Error ? error.message:"Login Failed"
        res.status(400).json({
            success:false,
            message
        })
    }

}

export const getMe=async(req:Request,res:Response):Promise<void>=>{
    try {
        const user=await getCurrentUser(req.user!.id)
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        const message=error instanceof Error ? error.message : "Failed to get user"
        res.status(404).json({
            success:false,
            message
        })
    }
}