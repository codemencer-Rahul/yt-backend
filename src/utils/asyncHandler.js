//  ---- Try Catch(1)
/*
const asyncHandler = (fn) => {
    async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch(err) {
            res.status(err.code || 500).json({
                success: false,
                message: err.message
            })
        }
    }
}

export { asyncHandler }
*/


// ---- Try Catch(2)
/*
const asyncHandler = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
           success: false,
           message: error.message 
        })
    }
}

export { asyncHandler }
*/

// ---- Promise
const asyncHandler = (reqHandler) => {
    (req,res,next) => {
        Promise.resolve(reqHandler(req, res, next))
        .reject((err) => next(err))
    }
}

export { asyncHandler }