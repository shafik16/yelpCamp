const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../utils/middleware');
const campController = require('../controllers/campgrounds');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campController.index))
    .post(
        isLoggedIn,
        upload.array('image'),
        validateCampground,
        catchAsync(campController.createCamp))

router.get('/new', isLoggedIn, campController.newForm);

router.route('/:id')
    .get(catchAsync(campController.showPage))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image'),
        validateCampground,
        catchAsync(campController.updateCamp))
    .delete(
        isLoggedIn,
        isAuthor,
        catchAsync(campController.deleteCamp))

router.get('/:id/edit',
    isLoggedIn,
    isAuthor,
    catchAsync(campController.editForm));

module.exports = router;