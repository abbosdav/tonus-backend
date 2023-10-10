import ApiError from "../exeptions/api-error.js";
import Subscribe from "../models/subscribeModel.js";
import User from "../models/userModel.js"
import Abonoment from "../models/abonomentModel.js";

class SubscribeController{
    async add(req, res, next){
        try{
           
            const service_id = process.env.SERVICE_ID
            const merchant_id = process.env.MERCHANT_ID
            const {userId, abonId, workCount, status, cardType} = req.body;
            const abonoment = await Abonoment.findById({_id:abonId})
            // const user = await User.findByIdAndUpdate({_id: userId}, {status: status}, {new: true}).select("-passwordHash -roleUser")
            let card = cardType || 'uzcard'
            // console.log(workCount, abonoment)


            await  Subscribe.findOne({})
                .sort({_id: "desc"})
                .then(latestSub =>{
                    req.body._id = latestSub._id + 1;
                    const subscribe = new Subscribe(req.body);
                        subscribe.save().then((subs)=>{
                            if(abonoment.price == 0){
                                User.findByIdAndUpdate({_id: userId}, {status: 2}, {new: true}).then(res =>{
                                    console.log('res', res)
                                });
                                const redirectUrl = 'ok'
                                res.json({redirectUrl})
                                return
                            }
                            const redirectUrl = `https://my.click.uz/services/pay?service_id=${service_id}&merchant_id=${merchant_id}&amount=${abonoment.price}&transaction_param=${subs._id}&return_url=umft.uz&card_type=${card}`
                            res.json({redirectUrl})
                            })

                })
        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }



    async all(req, res, next){
        try{
            const items = await Subscribe.find()
            res.json(items)

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }



    async check(req, res, next){
        try{
            const item = await Subscribe.findOne({userId:req.params.id});
            res.json({status: item.status})

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }




    async remove(req, res, next){
        try{
            const item = await Subscribe.findByIdAndDelete({_id:req.params.id});
            res.json({message: 'deleted'})

        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }
}

export default new SubscribeController;

