import * as mongoose from "mongoose";
mongoose.set("strictQuery", false); // this line is to remove mongoose warning

export interface IListSchema extends mongoose.Document {
  title: string;
}

export const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const List =
  (mongoose.models.List as mongoose.Model<IListSchema>) ||
  mongoose.model<IListSchema>("List", listSchema);

export default List;
