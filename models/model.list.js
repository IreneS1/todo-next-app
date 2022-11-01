import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
});

const List = mongoose.models.List || mongoose.model('List', listSchema);

export default List;
