import ApiError from "../exeptions/api-error.js";
import Workout from "../models/workoutModel.js";
import Address from "../models/addressModel.js";
import Typetime from "../models/typetimeModel.js";

class WorkoutController{
    async create(req, res, next){
        try{
            const {filial, startTime, endTime, during, limit, status} = req.body;
            const item = await Workout.create({filial, startTime, endTime, during, limit, status});
            res.json(item._doc)
        }catch(e){
            console.log(e)
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async all(req, res, next){
        try{

            let filter = {};
            filter.filial = req.query.filial;
            filter.during = req.query.during;


            let date = new Date();
            let currentDay = date.getDate();

            let sendDate = new Date(req.query.day);
            let sendDay = sendDate.getDate();

            // if(sendDay == currentDay || req.query.day == ''){
            //     filter.startTime = {$gt: date}
            // }

            let readyArr = []
            const items = await Workout.find(filter).populate('filial during').sort({_id:-1}).then(res =>{
               return  res.map(item =>{
                    let sTime = new Date(item.startTime).getHours();
                    let cTime = date.getHours();

                    if(sendDay == currentDay){
                        if(cTime < sTime){

                            readyArr.push(item)
                        }
                    }else{
                        readyArr.push(item)
                    }
                })
            });

            res.json(readyArr)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async getOne(req, res, next){
        try{
            const item = await Workout.findById({_id: req.params.id}).populate('filial during').lean()
            res.json(item)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async update(req, res, next){
        try{
            const upItem = await Workout.findByIdAndUpdate({_id: req.params.id}, {...req.body}, {new: true})
            res.json(upItem)
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async remove(req, res, next){
        try{
            const delItem = await Workout.findByIdAndDelete({_id: req.params.id})
            res.json({id: delItem._id})
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }


    async init(req, res, next){
        try{
            const address = await Address.find().lean()
            const timetype = await Typetime.find().lean()
            res.json({address, timetype})
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }
}

export default new WorkoutController;

