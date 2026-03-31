import bcrypt from 'bcryptjs'
import {prisma} from '@trademirror/db'
import { generateToken } from '../lib/jwt'


export const registerUser=async(name:string,email:string,password:string)=>{
    const existingUser=await prisma.user.findUnique({where:{email}})

    if(existingUser){
        throw new Error("Email already registered")
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user=await prisma.user.create({
        data:{
            name,email,password:hashedPassword
        }
    })
    const token=generateToken({
        id:user.id,name:user.name,email:user.email
    })

   return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      capital: user.capital,
      dailyLossLimit: user.dailyLossLimit,
      maxTradesPerDay: user.maxTradesPerDay
    },
    token
  }
}
    
export const loginUser=async(email:string,password:string)=>{
    const user=await prisma.user.findUnique({where:{email}})

    if(!user){
        throw new Error("Invalid crendentials")
    }

    const isValidPassword=await bcrypt.compare(password,user.password)

    if(!isValidPassword){
        throw new Error("Inavlid crendentials")
    }
    const token=generateToken({
        id:user.id,name:user.name,email:user.email
    })
    return {
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            capital:user.capital,
            dailyLossLimit:user.dailyLossLimit,
            maxTradesPerDay:user.maxTradesPerDay
        },
        token
    }
}

export const getCurrentUser=async(userId:string)=>{

    const user=await prisma.user.findUnique({where:{id:userId},select:{id:true,name:true,email:true,capital:true,dailyLossLimit:true,maxTradesPerDay:true,createdAt:true}})

    if(!user){
        throw new Error("User not found")
    }

    return user
}