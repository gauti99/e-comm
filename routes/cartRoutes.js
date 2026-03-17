
import express from 'express';
import {
  addToCart,
  removeFromCart,
  updateCartItem,
  getCart,
  clearCart,
  decreaseQuantity
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All cart routes are protected (require authentication)
router.use(protect);

// Cart routes
router.route('/')
  .get(getCart)
  .delete(clearCart);

router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);
router.put('/update', updateCartItem);
router.put('/decrease', decreaseQuantity);

export default router;