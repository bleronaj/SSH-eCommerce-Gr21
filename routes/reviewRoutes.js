import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { addReview, getProductReviews, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/add', requireSignIn, addReview);
router.get('/:productId', getProductReviews);
router.delete('/:reviewId', requireSignIn, deleteReview);

export default router;
