import { Schema, model, models } from 'mongoose';

const listSchema = new Schema({
    title: String,
});

const List = models.List || model('List', listSchema);

export default List;
