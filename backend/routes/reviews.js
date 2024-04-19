const express = require("express");
const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview,
    hideReview,
} = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
    .route("/")
    .get(getReviews)
    .post(protect, authorize("admin", "user"), addReview);
router
    .route("/:id")
    .get(getReview)
    .put(protect, authorize("admin", "user"), updateReview)
    .delete(protect, authorize("admin", "user"), deleteReview);
router
    .put('/:id/hide', protect, authorize('admin'), hideReview);

module.exports = router;
