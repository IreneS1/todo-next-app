import { Schema, model, models } from 'mongoose';

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
});

const List = models.List || model('List', listSchema);

export default List;
