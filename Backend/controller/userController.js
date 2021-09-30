import UserModel from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';
import generateJWT from '../utils/generateJWT.js';

/*@desc AUth and token send*/
/* @route POST/api/users */
//@access Public
const userLoginAuth = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user && await (user.matchPassword(password))) {
            res.status(200).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateJWT(user._id)
            });
        }
        else {
            res.status(404).send({
                message: 'Email or Password incorrect!'
            })
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})

/*@desc Fetch all users*/
/* @route GET/api/users */
//@access Public
const getAllUsers = asyncHandler(async (req, res) => {

    try {

        const users = await UserModel.find({});
        res.status(200).send(users)
    } catch (e) {
        res.status(404).send(e.message);
    }

})

/*@desc Fetch single user*/
/* @route GET/api/user/:id */
//@access Public

const getUserById = asyncHandler(async (req, res) => {

    try {
        const item = await UserModel.findById(req.params.id);
        if (item) {
            res.status(200).send(item)
        }
        else {
            res.status(404).send({ message: "User Not Found!" })
        }
    } catch (e) {
        res.status(500).send(e.message);

    }

})

/*@desc Create single user*/
/* @route POST/api/user */
//@access Public

const createUser = asyncHandler(async (req, res) => {
    const user =  await UserModel.create(req.body); //no need to use new keyword
    try {
        //await user.save(); if using 'create' then no need to use user.save();
        res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            password:user.password,
            token: generateJWT(user._id)
        });
    } catch (e) {
        res.status(500).send(e.message)
        
    }

})

/*@desc Get user profile*/
/* @route GET/api/user/profile */
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {

    try {
        const user = await UserModel.findById(req.user.id);
        if (user) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateJWT(user._id)
            })
        }
        else {
            res.status(404).send('User not found !')
        }
    } catch (e) {
        res.status(500).send(e.message)
    }

})


/*@desc Update user profile*/
/* @route PUT/api/user/profile */
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {

    try {
        const user = await UserModel.findById(req.user.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            
            if (req.body.password) {
                user.password=req.body.password
            }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateJWT(updatedUser._id)
            })
        }
        else {
            res.status(404).send('User not found !')
        }
    } catch (e) {
        res.status(500).send(e.message)
    }

})


/*ADMIN*/

/*@desc Fetch all users*/
/* @route GET/api/users/admin */
//@access ADMIN/Private
const adminGetAllUsers = asyncHandler(async (req, res) => {

    try {
        const users = await UserModel.find({});
        res.status(200).send(users)
    } catch (e) {
        res.status(404).send(e.message);
    }

})


/*@desc Delete user by Id*/
/* @route DELETE/api/users/admin */
//@access ADMIN/Private
const adminDeleteUserById = asyncHandler(async (req, res) => {

    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).send(user)
    } catch (e) {
        res.status(404).send(e.message);
    }

})

/*@desc Fetch all users*/
/* @route GET/api/users/admin/:id */
//@access ADMIN/Private
const adminGetUserById = asyncHandler(async (req, res) => {

    try {
        const users = await UserModel.findById(req.params.id).select('-password');
        res.status(200).send(users)
    } catch (e) {
        res.status(404).send(e.message);
    }

})

/*@desc Update user profile*/
/* @route PUT/api/users/admin/update/:id */
//@access ADMIN/Private

const adminUpdateUserProfile = asyncHandler(async (req, res) => {

    try {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin=req.body.isAdmin

            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            })
        }
        else {
            res.status(404).send('User not found !')
        }
    } catch (e) {
        res.status(500).send(e.message)
    }

})


export { adminGetUserById,adminUpdateUserProfile, adminDeleteUserById, adminGetAllUsers, userLoginAuth, getAllUsers, getUserById, createUser, getUserProfile, updateUserProfile };