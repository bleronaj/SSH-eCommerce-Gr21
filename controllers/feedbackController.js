
import Feedback from '../models/Feedback.js';

// Merr të gjitha rishikimet
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).populate('user', 'name').populate('product', 'name');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Merr një rishikim sipas ID-së
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('user', 'name').populate('product', 'name');
    if (feedback) {
      res.json(feedback);
    } else {
      res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Krijon një rishikim të ri
export const createFeedback = async (req, res) => {
  const { rating, comment, product } = req.body;
  try {
    const feedback = new Feedback({
      user: req.user._id,
      rating,
      comment,
      product,
    });
    const createdFeedback = await feedback.save();
    res.status(201).json(createdFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Përditëson një rishikim ekzistues
export const updateFeedback = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (feedback && feedback.user.toString() === req.user._id.toString()) {
      feedback.rating = rating || feedback.rating;
      feedback.comment = comment || feedback.comment;
      const updatedFeedback = await feedback.save();
      res.json(updatedFeedback);
    } else {
      res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fshin një rishikim
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (feedback && feedback.user.toString() === req.user._id.toString()) {
      await feedback.remove();
      res.json({ message: 'Feedback removed' });
    } else {
      res.status(404).json({ message: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
