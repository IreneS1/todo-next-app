import * as mongoose from "mongoose";

export interface IList extends mongoose.Document {
  title: string;
}

export const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const List =
  (mongoose.models.List as mongoose.Model<IList>) ||
  mongoose.model<IList>("List", listSchema);

export default List;
