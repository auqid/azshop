import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateCodOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderSummary,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/summary').get(protect, admin, getOrderSummary);
router.route('/:id').get(protect, checkObjectId, getOrderById);
router.route('/:id/pay').put(protect, checkObjectId, updateOrderToPaid);
router
  .route('/:id/pay-cod')
  .put(protect, admin, checkObjectId, updateCodOrderToPaid);
router
  .route('/:id/deliver')
  .put(protect, admin, checkObjectId, updateOrderToDelivered);

export default router;
