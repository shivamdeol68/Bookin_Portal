const express = require('express');
const router = express.Router();
const { sendMessageAndSaveFeedback, deleteMessageAndFeedback } = require('../controller/Feedback');

// Route to send message and save feedback
router.post('/send-feedback', sendMessageAndSaveFeedback);

// Route to delete message and its associated feedback
router.delete('/delete-feedback/:userId/:messageId', deleteMessageAndFeedback);

module.exports = router;
