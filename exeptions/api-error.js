class ApiError extends Error {
    constructor(status, massage, errors = []){
        super();
        this.status = status
        this.massage = massage
        this.errors = errors
    }

    static badRequest(massage, errors){
        return new ApiError (400, massage, errors)
    }

    static  unauthorized(massage, errors){
        return new ApiError (401, massage, errors)
    }

    static forbidden(massage, errors){
        return new ApiError (403, massage, errors)
    }

    static notPage(massage, errors){
        return new ApiError (404, massage, errors)
    }

    static internal(massage, errors){
        return new ApiError (500, massage, errors)
    }
}

export default  ApiError;