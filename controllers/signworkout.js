import ApiError from "../exeptions/api-error.js";
import Sign from "../models/signworkModel.js";
import Workout from "../models/workoutModel.js";


class SignController{
    async add(req, res, next){
        try{
            const {userId, workId } = req.body;
            const result = await Sign.find({ userId, workId});
            if(result.length > 0){
                return next(ApiError.badRequest("User allaqachon bu mashg'ulotga yozilgan"))
            }

            let { limit } = await Workout.findOne({_id: workId}).lean()
            if(limit > 0){
                let uplimit = await Workout.findByIdAndUpdate({_id: workId}, {limit:limit - 1}, {new:true})
                if(uplimit.limit == 0){
                    await Workout.findByIdAndUpdate({_id: workId}, {status:false})
                }
            }

            const item = await Sign.create({ userId, workId});
            res.json(item)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }

    // async all(req, res, next){
    //     try{
    //         const items = await Subscribe.find()
    //         res.json(items)
    //
    //     }catch(e){
    //         ApiError.internal("Post yaratilmadi", e)
    //     }
    // }


}

export default new SignController;

