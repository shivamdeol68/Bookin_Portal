const Admin = require('../models/Admin');
const User = require('../models/user');
const Feedback = require('../models/feedback');

const {
    Hotel,
    Flight,
    CarRent,
    VacationPackage
} = require("../models/data");
    
// Function to send message and save feedback
// Function to send message and save feedback
const sendMessageAndSaveFeedback = async (req, res) => {
    try {
        const { userId, adminId, itemId, message, itemModel } = req.body;

        // Check if itemModel is provided
        if (!itemModel) {
            return res.status(400).json({ success: false, error: 'Item model is required' });
        }

        // Save the feedback
        const newFeedback = new Feedback({ userId, Feedback: message, itemId, itemModel });
        await newFeedback.save();

        // Update item's feedback list
        let item;
        switch (itemModel) {
            case 'Hotel':
                item = await Hotel.findById(itemId);
                break;
            case 'Flight':
                item = await Flight.findById(itemId);
                break;
            case 'CarRent':
                item = await CarRent.findById(itemId);
                break;
            case 'VacationPackage':
                item = await VacationPackage.findById(itemId);
                break;
            default:
                return res.status(400).json({ success: false, error: 'Invalid item model' });
        }

        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }

        item.Feedback.push(newFeedback);
        await item.save();

        // Update user's feedback list
        await User.findOneAndUpdate({ _id: userId }, { $push: { Feedback: newFeedback._id } });

        // Update admin's feedback list
        await Admin.findOneAndUpdate({ _id: adminId }, { $push: { Feedback: newFeedback._id } });

        res.status(201).json({ success: true, message: 'Feedback sent and saved successfully', newFeedback });
    } catch (error) {
        console.error('Error sending and saving feedback:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};




// Function to delete message and its associated feedback
const deleteMessageAndFeedback = async (req, res) => {
    try {
        const { userId, messageId } = req.params;

        // Find the feedback to get the associated item
        const feedback = await Feedback.findById(messageId);
        if (!feedback) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        }

        // Remove the feedback ID from the item's feedback list
        const itemModel = getItemModelByType(feedback.itemId);
        if (!itemModel) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        const item = await itemModel.findById(feedback.itemId);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        item.Feedback.pull(messageId);
        await item.save();

        // Remove the feedback message
        await Feedback.deleteOne({ _id: messageId });

        // Remove the feedback ID from user's and admin's feedback lists
        await User.findOneAndUpdate({ _id: userId }, { $pull: { Feedback: messageId } });
        await Admin.findOneAndUpdate({ _id: userId }, { $pull: { Feedback: messageId } });

        res.status(200).json({ success: true, message: 'Message and its feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting message and feedback:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Helper function to get item model by its type
// const getItemModelByType = (type) => {
//     switch (type) {
//         case 'Hotel':
//             return Hotel;
//         case 'Flight':
//             return Flight;
//         case 'CarRent':
//             return CarRent;
//         case 'VacationPackage':
//             return VacationPackage;
//         default:
//             return null;
//     }
// };

module.exports = {
    sendMessageAndSaveFeedback,
    deleteMessageAndFeedback,
};
