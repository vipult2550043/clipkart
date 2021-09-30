import express from 'express';
const router = express.Router();
import { auth, isAdmin } from '../middleware/authMiddleware.js';
import { adminGetUserById,adminUpdateUserProfile, adminDeleteUserById, adminGetAllUsers, userLoginAuth, getAllUsers, getUserById, createUser, getUserProfile, updateUserProfile } from '../controller/userController.js';

/*User Routes Admin*/
router.delete('/admin/:id', auth, isAdmin, adminDeleteUserById); //passing isAdmin as another parameter to check if user is admin
router.get('/admin/:id', auth, isAdmin, adminGetUserById); //passing isAdmin as another parameter to check if user is admin
router.get('/admin', auth, isAdmin, adminGetAllUsers); //passing isAdmin as another parameter to check if user is admin
router.put('/admin/update/:id', auth, isAdmin, adminUpdateUserProfile);

/*User Route Normal*/
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);
router.post('/login', userLoginAuth);
router.get('/:id', getUserById);
router.get('/', getAllUsers);
router.post('/', createUser);

export default router;





/*@desc Fetch all users*/
/* @route GET/api/users */
//@access Public
// router.get('/', async (req, res) => {
//         try {
//         const products = await UserModel.find({});
//         res.status(200).send(products)
//     } catch (e) {
//         res.status(400).send(e);
//     }

// })




