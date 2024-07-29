const { Schema, default:mongoose}=require("mongoose")

// Feedback Schema
const FeedbackSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Feedback: {
        type: String,
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'itemModel'
    },
    itemModel: {
        type: String,
        required: true,
        enum: ["Hotel", "Flight", "CarRent", "VacationPackage"]
    }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
