import Review from '../models/reviewModel.js';


export const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const review = new Review({
      user: req.user._id,
      product,
      rating,
      comment
    });
    await review.save();
    res.status(201).send({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).send({ message: 'Failed to add review', error });
  }
};


export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('user', 'name');
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ message: 'Failed to get reviews', error });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'Unauthorized action' });
    }
    await review.remove();
    res.send({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete review', error });
  }
};
