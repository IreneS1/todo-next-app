import * as mongoose from "mongoose";
mongoose.set("strictQuery", false); // this line is to remove mongoose warning

export interface IItemSchema extends mongoose.Document {
  listId: mongoose.Schema.Types.ObjectId;
  title: string;
  competed: boolean;
  isDeleted: boolean;
}

export const ItemSchema = new mongoose.Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listSchema",
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Item =
  (mongoose.models.Item as mongoose.Model<IItemSchema>) ||
  mongoose.model<IItemSchema>("Item", ItemSchema);

export default Item;
