import express from 'express';
import { auth, isAdmin } from '../middleware/authMiddleware.js';
import { getTopProducts,createProductReviewById,adminUpdateProductById,adminCreateProduct, getProducts, getProductById, adminGetAllProduct, adminDeleteProductById} from '../controller/productController.js';
const router = express.Router();

/*Product Routes*/
router.put('/admin/:id', auth, isAdmin, adminUpdateProductById); //To check if user is Admin or not
router.delete('/admin/:id', auth, isAdmin, adminDeleteProductById); //To check if user is Admin or not
router.post('/admin', auth, isAdmin, adminCreateProduct); //To check if user is Admin or not
router.get('/admin', auth, isAdmin, adminGetAllProduct); //To check if user is Admin or not
router.post('/:id/reviews', auth, createProductReviewById);
router.get('/top', getTopProducts);
router.get('/:id', getProductById);
router.get('/', getProducts);

export default router;