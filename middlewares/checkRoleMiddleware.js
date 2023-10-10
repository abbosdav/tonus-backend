import ApiError from "../exeptions/api-error.js"
import jwt from "jsonwebtoken"

export default function(role){
    return function(req, res, next){
        if(req.method === "OPTIONS") {
            next()
        }
        
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return next(ApiError.unauthhorizedError())
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            
            if(decoded.role !== role){
                return next(ApiError.forbidden())
            } 
            req.user = decoded
            next()
        }catch(e){
            return next(ApiError.unauthhorizedError())
        }
    }
    
}
