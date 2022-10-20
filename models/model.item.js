import { Schema, model, models } from 'mongoose';
import List from '../models/model.list'

const ObjectID = require('mongodb').ObjectId;

const itemSchema = new Schema({
    title: String,
    status: Boolean,
    list_id: String,
});

const Item = models.Item || model('Item', itemSchema);

export default Item;
