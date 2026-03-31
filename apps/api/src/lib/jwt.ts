import { AuthUser } from "../types";
import jwt from 'jsonwebtoken'

const JWT_SECRET=process.env.JWT_SECRET || 'fallback-secret'
const JWT_EXPIRES_IN='7d'

export const generateToken=(user:AuthUser):string=>{
    return jwt.sign({id:user.id,name:user.name,email:user.email},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
}

export const verifyToken=(token:string):AuthUser=>{
    const decoded=jwt.verify(token,JWT_SECRET) as AuthUser
    return decoded
}