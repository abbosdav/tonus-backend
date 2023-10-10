import ApiError from "../exeptions/api-error.js"
import User from "../models/userModel.js"
import Sign from "../models/signworkModel.js";
import Subscribe from "../models/subscribeModel.js";
import bcrypt from "bcrypt"



class UserController{
    async all(req, res, next){
        try{
            const users = await User.find({roleUser: 'USER'});
            return res.json(users)
        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }

    async update(req, res, next){
        try{
            const {username, password, avatarUrl} = req.body;
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.findOneAndUpdate({_id: req.params.id}, {username: username, avatarUrl, passwordHash:hashPassword}, {new:true})
            const {passwordHash, roleUser, ...userData} = user._doc
            res.json(userData)
        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }

    async remove(req, res, next){
        try{
            const user = await User.findByIdAndDelete({_id:req.params.id});
            return res.json(user._id)

        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }


    async details(req, res, next){
        try{
            const data = await User.findById({_id: req.params.id}).select('-passwordHash -roleUser');
            const workouts = await Sign.find({userId: req.params.id}).populate('workId')
            const subscribe = await Subscribe.find({userId: req.params.id}).populate('abonId')
            const datas = await Promise.all([workouts, data, subscribe]).then(value => value)
            return res.json({userdata:datas[1], userworks:datas[0], subscribe:datas[2]})

        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }

    async changestatus(req, res, next){
        try{
            let { status} = req.body;
            const user = await User.findByIdAndUpdate({_id: req.params.id}, {status:status}, {new: true}).select("-passwordHash -roleUser")
            return res.json(user)
        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }


    async getwork(req, res, next){
        try{
            const workouts = await Sign.find({userId: req.params.id}).populate({path:"workId" ,populate:{path:"during filial"}});

            return res.json(workouts)
        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }

    async getsubscribe(req, res, next){
        try{
            let subdata = await Subscribe.findOne({userId:req.params.id}).populate('abonId');
            const user = await User.findOne({_id: req.params.id});

            if (user.status == 0){
                return res.json({current:0, all:0})
            }

            return res.json({current:subdata.workCount, all:subdata.abonId.countDays})
        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }


    async check(req, res, next){
        try{
            const response = await User.findById({_id: req.params.id}, {status:2}, {new: true})
            return res.json({_id:response._id, status:response.status})
        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }


}




export default new UserController()