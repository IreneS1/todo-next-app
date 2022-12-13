import connectMongo from "../../../utils/connectMongo";
import Item, { IItemSchema } from "../../../models/model.item";
import type { NextApiRequest, NextApiResponse } from "next";

// adds type to response data
type Data = {
  item?: object;
  data?: object;
  success?: boolean;
  error?: unknown;
};

export default async function itemHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const {
  //   query: { id },
  //   method,
  // } = req;

  try {
    // connect to database
    await connectMongo();

    const item = (await Item.create(req.body)) as IItemSchema;
    if (!item) {
      return res.status(400).json({ success: false });
    }
    console.log("CREATED DOCUMENT");
    console.log("create item", item);
    console.log(req.body);
    res.status(200).json({ item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
