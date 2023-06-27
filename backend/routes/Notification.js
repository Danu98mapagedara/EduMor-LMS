const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/notificationController');

// Create a new notification
router.post('/', notificationController.createNotification);

// Get a single notification by ID
router.get('/:id', notificationController.getNotificationById);

// Update a notification by ID
router.put('/:id', notificationController.updateNotificationById);

// Delete a notification by ID
router.delete('/:id', notificationController.deleteNotificationById);

// Get the newest notification
router.get('/newest', notificationController.getNewestNotification);

module.exports = router;
