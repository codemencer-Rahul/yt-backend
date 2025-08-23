import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async(req, res) => {
    /* --- registration process ---
    get user details from frontend
    validation - not empty
    check if user already exists: username, email
    get images, check for avatar
    upload them to cloudinary, avatar
    create user object - create entry in db
    remove password and refresh token field from response(it will not go to frontend)
    check for user creation
    return res
    */

    const {username, email, fullname, password} = req.body // req.body => form se data aaye ya json se aaye
    // console.log(`username: ${username}, email: ${email}`)
    // res.json({
    //     "name": username
    // })

    // if(fullname === ""){
    //     throw new ApiError(400, "fullname is required")
    // }  
    if(
        [username, email, fullname, password].some((field) => field?.trim() === "") //some: if any of the value is true ya false
    ){
        throw new ApiError(400, "all fields are required")
    }  

    const existedUser = await User.findOne({ // outer {} is the query object
        $or: [{ username }, { email }] // $or is a mongodb operator
    })

    if(existedUser){
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files.avatar[0]?.path
    const coverImageLocalPath =  req.files.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(402, "avatar file is required")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath) // variable is holding a res. u've to extract url
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(402, "avatar file is required")
    }

    const user = await User.create({
        username,
        email,
        fullname,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const userCreated = await User.findById(user._id).select( // here user._id is not inside {}, just bcz of findById.
        "-password -refreshToken"
    )

    if(!userCreated){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, userCreated, "User registered successfully!!")
    )
    // new ApiResponse(200, userCreated, "zubidubi")
})

export { registerUser }