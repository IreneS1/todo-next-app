import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listSchema",
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
