import connectMongo from "../../../utils/connectMongo";
import Item, { IItemSchema } from "../../../models/model.item";
import type { NextApiRequest, NextApiResponse } from "next";

// adds type to response data
type Data = {
  data?: object;
  success: boolean;
};
// req.method PUT to soft delete and check and item and mark as completed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const itemId = req.query.deleteId || "No item id found"; // added || to remove undefined type
  console.log("query:", itemId);
  console.log("req body", req.body);
  try {
    // if (itemId === "No item id found") {
    //   throw new Error("No item id found");
    // }

    // connect to database
    await connectMongo();
    await Item.findByIdAndUpdate(itemId, req.body);
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: item });
    console.log("response inside api:", { data: item });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
