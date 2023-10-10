import ApiError from "../exeptions/api-error.js"
import Check from "../models/checkModel.js"
import Subscribe from "../models/subscribeModel.js";
import User from "../models/userModel.js"


class CheckController{
    async create(req, res, next){
        try{
           
            let sub = await Subscribe.findOne({userId:req.body.userId});

            if(sub.workCount == 0){
                return next(ApiError.badRequest("Userni obunalari tugagan!"))
            }

            let a = await Check.create({userId: req.body.userId});
            let updated = await Subscribe.findOneAndUpdate({userId: req.body.userId}, {workCount:sub.workCount - 1}, {new: true})

            if(updated.workCount == 0){
                const user = await User.findByIdAndUpdate({_id: req.body.userId}, {status:0}, {new:true});
                const de = await Subscribe.deleteMany({userId: req.body.userId})

            }

            res.json({message: 'success'})
        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }

    // startDay(dates){
    //     console.log(dates, 'bu shu')
    //     let d = new Date(dates)
    //     let year = d.getFullYear()
    //     let date = d.getDate()
    //     let month = d.getMonth()
    //
    //     return month+','+date+','+year
    // }

    async all(req, res, next){
        try{
            const {date} = req.query
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            const users = await Check.find({createdAt:{$gte: startOfDay, $lt: endOfDay}}).populate("userId")
            res.json(users)

        }catch(e){
            ApiError.internal("Ro'yxatdan o'tkazilmadi", e)
        }
    }
}

export default new CheckController;