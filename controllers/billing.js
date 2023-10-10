import ApiError from "../exeptions/api-error.js"
import User from "../models/userModel.js"
import Subscribe from "../models/subscribeModel.js";
import Abonoment from "../models/abonomentModel.js";
import Click from "click-billing"

const click_obj = new Click('JS5S2FYciW249')


class BillingController {
    async starting(req, res, next){
        try{
           const { merchant_trans_id } = req.body
            const order = { _id: null, amount : null, status: null };

            Subscribe.findOne({_id :merchant_trans_id}).then((subData)=>{
                Abonoment.findById({_id: subData.abonId}).then(resData =>{
                    order.amount = resData.price
                    order._id = subData._id
                    order.status = subData.status

                    let result = click_obj.create_obj_val(req.body, order)
                    res.json(result)
                })
            })


        }catch(e){
            ApiError.internal("Prepare jarayonida xatolik yuz berdi!", e)
        }
    }

    async prosess(req, res, next){
        try{
            const {click_trans_id, service_id, click_paydoc_id, merchant_trans_id, amount, action, error, error_note, sign_time, sign_string, merchant_prepare_id} = req.body

            const order = { _id: null, amount : null, status: null };

            Subscribe.findOne({_id :merchant_trans_id}).then((subData)=>{
                Abonoment.findById({_id: subData.abonId}).then(resData =>{
                    order.amount = resData.price
                    order._id = subData._id
                    order.status = subData.status

                    let result = click_obj.create_obj_val(req.body, order);

                    if(result.error == 0){
                        User.findByIdAndUpdate({_id: subData.userId}, {status: 2}, {new: true}).then(res=>{
                        })
                    }
                    res.json(result)
                })
            })


        }catch(e){
            ApiError.internal("Post yaratilmadi", e)
        }
    }



}


export default new BillingController;