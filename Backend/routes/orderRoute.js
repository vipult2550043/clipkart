import express from 'express';
import { auth, isAdmin } from '../middleware/authMiddleware.js';
import { adminGetAllUserOrders,addOrderItems, getAllPlacedOrder, getSinglePlacedOrder, updateOrderToPaid, getAllUserOrders } from '../controller/orderController.js';
const router = express.Router();

/*Product Routes*/
router.get('/allorder/admin', auth, isAdmin, adminGetAllUserOrders);
router.get('/allorder', auth, getAllUserOrders);
router.put('/:id/pay', auth, updateOrderToPaid);
router.get('/:id', auth, getSinglePlacedOrder);
router.post('/', auth, addOrderItems);
router.get('/', auth, getAllPlacedOrder);

export default router;