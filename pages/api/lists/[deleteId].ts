import connectMongo from "../../../utils/connectMongo";
import Item from "../../../models/model.item";
import type { NextApiRequest, NextApiResponse } from "next";

// adds type to response data (didn't use because catch(error) ts didn't like it)
// type Data = {
//   data?: object;
//   success?: boolean;
//   error?: string;
// };
// req.method PUT to soft delete and check and item and mark as completed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const itemId = req.query.deleteId || "No item id found"; // added || to remove undefined type
  console.log("query:", itemId);
  console.log("req body", req.body);
  console.log("method", req.method);

  try {
    if (req.method !== "PUT") {
      throw new Error(
        `Unsupported method ${req.method}. Only PUT method is supported`
      );
    }
    if (itemId === "No item id found") {
      throw new Error("No item id found");
    }

    // connect to database
    await connectMongo();
    await Item.findByIdAndUpdate(itemId, req.body);
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json((error as Error).message);
  }
}
