import ApiError from "../exeptions/api-error.js"


export default function(req, res, next){
    try{

        const {click_trans_id, service_id, click_paydoc_id, merchant_trans_id, amount, action, error, error_note, sign_time, sign_string, merchant_prepare_id} = req.body;


        console.log(merchant_prepare_id,'pustoy')

        console.log(error)


        next()
    }catch(e){
        return next(ApiError.unauthhorizedError())
    }
}