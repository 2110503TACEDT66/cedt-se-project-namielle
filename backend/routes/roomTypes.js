const express = require('express');
const {
    getRoomTypes,
    getRoomType,
    addRoomType,
    updateRoomType,
    deleteRoomType,
} = require('../controllers/roomTypes');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
    .route("/")
    .get(protect, getRoomTypes)
    .post(protect, authorize("admin", "user"), addRoomType);
router
    .route("/:id")
    .get(protect, getRoomType)
    .put(protect, authorize("admin", "user"), updateRoomType)
    .delete(protect, authorize("admin", "user"), deleteRoomType);

module.exports = router;