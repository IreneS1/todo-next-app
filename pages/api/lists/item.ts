import connectMongo from "../../../utils/connectMongo";
import Item, { IItemSchema } from "../../../models/model.item";
import type { NextApiRequest, NextApiResponse } from "next";

// adds type to response data (didn't use because catch(error) ts didn't like it)
// type Data = {
//   item?: object;
//   data?: object;
//   success?: boolean;
//   error?: unknown;
// };

export default async function itemHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const {
  //   query: { id },
  //   method,
  // } = req;

  try {
    if (req.method !== "POST") {
      throw new Error(
        `Unsupported method ${req.method}. Only POST method is supported`
      );
    }
    if (JSON.stringify(req.body) === "{}") {
      throw new Error("request body not found");
    }
    // connect to database
    await connectMongo();

    const item = (await Item.create(req.body)) as IItemSchema;
    if (!item) {
      return res.status(400).json({ success: false });
    }
    console.log("CREATED DOCUMENT");
    res.status(200).json({ item });
  } catch (error) {
    //console.log(error);
    res.status(500).json((error as Error).message);
  }
}
