import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"

// @desc Auth user & token
// @route GET/api/login
// @access Public 
const authUser= asyncHandler(async(req,res)=>{
    res.send('Auth User')
    });

// @desc Register user
// @route POST/api/users
// @access Public 
const registerUser= asyncHandler(async(req,res)=>{
    res.send('Register User')
    });

    // @desc Logout /clear cookie
// @route POST/api/logout
// @access Private 
const logoutUser = asyncHandler(async(req,res)=>{
    res.send('Logout User')
    });

// @desc Get user profile
// @route GET /api/users/profile
// @access Private 
const getUserProfile = asyncHandler(async(req,res)=>{
    res.send('user profile')
    });

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private 
const updateUserProfile = asyncHandler(async(req,res)=>{
    res.send('update user profile')
    });


// @desc Get users
// @route get /api/users
// @access Private /Admin
const getUsers = asyncHandler(async(req,res)=>{
    res.send('get users')
    });

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private /Admin
const getUserByID = asyncHandler(async(req,res)=>{
    res.send('get user by ID')
    });
// @desc Delete user
// @route GET /api/users/:id
// @access Private /Admin
const deleteUser = asyncHandler(async(req,res)=>{
    res.send('delete user')
    });

    
// @desc Update user
// @route PUT /api/users/:id
// @access Private /Admin
const updateUser = asyncHandler(async(req,res)=>{
    res.send('Update users')
 });


 export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
    }   




