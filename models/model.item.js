import { Schema, model, models, Types } from 'mongoose';

const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    list_id: {
        type: String,
    }
});

const Item = models.Item || model('Item', itemSchema);

export default Item;
