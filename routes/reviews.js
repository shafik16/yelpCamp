const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../utils/middleware');
const reviewControllers = require('../controllers/reviews');

router.post('/',
    isLoggedIn,
    validateReview,
    catchAsync(reviewControllers.createReview));

router.delete('/:reviewId',
    isLoggedIn,
    isReviewAuthor,
    catchAsync(reviewControllers.deleteReview));

module.exports = router;