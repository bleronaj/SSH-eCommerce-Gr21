
import express from 'express';
import {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
} from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllFeedbacks)
  .post(protect, createFeedback);

router.route('/:id')
  .get(getFeedbackById)
  .put(protect, updateFeedback)
  .delete(protect, deleteFeedback);

export default router;
