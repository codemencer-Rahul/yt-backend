class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.success = false
        this.statusCode = statusCode
        this.data = null
        this.errors = errors

        if(stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export { ApiError }


/* Error ka msg structure:
stage 1 => success,msg,statusCode,data,
stage 2 => error[],stack

Note:- error me this.data hamesha null hi hoga, kyuki koi data aaya hi nhi. also this.success = false*/