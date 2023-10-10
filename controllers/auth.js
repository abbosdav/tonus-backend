import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import{ validationResult } from "express-validator"
import ApiError from "../exeptions/api-error.js"
import User from "../models/userModel.js"
import Subscribe from "../models/subscribeModel.js";


// Function generator token
const generateJwt = (id, phone, username, role)=>{
    return jwt.sign({id, phone, username, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}



class AuthController{
    async register(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest("So'rov bo'yicha xatolik!", errors.array()))
            }
            
            const {username, phone, password, avatarUrl, role} = req.body;
            const candidate = await User.findOne({phone});
           
            if(candidate){
                return next(ApiError.badRequest(`Bu ${phone} raqamda foydalanuvchi mavjud!`))
            }

            const hashPassword = await bcrypt.hash(password, 10)
            const user = await User.create({username, phone, passwordHash: hashPassword, avatarUrl, roleUser: role})
            const token = generateJwt(user.id, user.phone, user.username, user.roleUser)
            const {passwordHash, roleUser, ...userData} = user._doc
            return res.json({userData, token})



            // return res.cookie("accessToken", token, {httpOnly: true}).json({userData})

        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }



    async addactivate(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest("So'rov bo'yicha xatolik!", errors.array()))
            }
           
            const {username, phone, password, avatarUrl, role, count, abonoment} = req.body;
            const candidate = await User.findOne({phone});

            if(candidate){
                return next(ApiError.badRequest(`Bu ${phone} raqamda foydalanuvchi mavjud!`))
            }

            const hashPassword = await bcrypt.hash(password, 10)

            const user = await User.create({username, phone, passwordHash: hashPassword, avatarUrl, roleUser: role})
            const token = generateJwt(user.id, user.phone, user.username, user.roleUser)
            const {passwordHash, roleUser, ...userData} = user._doc;
            //shu yerda qayta korayapman

            let last = await  Subscribe.findOne({})
                .sort({_id: "desc"})
            req.body._id = last._id + 1;
            const subscribe = new Subscribe({_id: req.body._id, userId: userData._id, abonId: abonoment, workCount: count});

           await  subscribe.save()
            let update = await User.findByIdAndUpdate({_id: userData._id}, {status: 2}, {new: true}).select('-passwordHash')
            res.send(update)


        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }


    async login(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest("So'rov bo'yicha xatolik!", errors.array()))
            }

            const { phone, password } = req.body;
            const user = await User.findOne({phone}).lean();
            if(!user){
                return next(ApiError.badRequest(`Foydalanuvchi topilmadi. Ro'yxatdan o'ting`))
            }

            const checkPassword = bcrypt.compareSync(password, user.passwordHash )
            if(!checkPassword) return next(ApiError.badRequest(`Noto'gri parol!`, [{password: 'error'}]))

            const token = generateJwt(user.id, user.phone, user.username, user.roleUser)
            const {passwordHash, role, ...userData} = user
            return res.json({userData, token})

            // return res.cookie("accessToken", token, {httpOnly: true}).json({userData})
            
        }catch(e){
            ApiError.internal("Login qilinmadi", e)
        }
    }


    async isAdmin(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest("So'rov bo'yicha xatolik!", errors.array()))
            }
            const { phone, password } = req.body;
            const user = await User.findOne({phone});
            
            if(!user){
                return next(ApiError.badRequest(`Foydalanuvchi topilmadi. Ro'yxatdan o'ting`))
            }

            if(user.roleUser !== 'Admin'){
                return next(ApiError.forbidden(`Sizga ruxsat yo'q`))
            }


            const checkPassword = await bcrypt.compare(password, user.passwordHash)
            if(!checkPassword) return next(ApiError.badRequest(`Noto'gri parol!`))

            const token = generateJwt(user.id, user.phone, user.username, user.role)
            const bearerToken = 'Bearer ' + token;
            const {passwordHash, role, ...userData} = user._doc

            return res.json({userData, bearerToken})


        }catch(e){
            ApiError.internal("Login qilinmadi", e)
        }
    }

    
    async logout(req, res){
        res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none"
        }).status(200).json({message: 'User logout qilindi.'})
    }
}


export default new AuthController()