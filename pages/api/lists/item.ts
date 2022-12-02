import connectMongo from "../../../utils/connectMongo";
import Item, { IItem } from "../../../models/model.item";
import type { NextApiRequest, NextApiResponse } from "next";

// adds type to response data
type Data = {
  item?: object;
  data?: object;
  success?: boolean;
  error?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method,
  } = req;

  // connect to database
  await connectMongo();

  switch (method) {
    case "POST": // Create
      try {
        const item = (await Item.create(req.body)) as IItem;
        console.log("CREATED DOCUMENT");
        console.log("create item", item);
        console.log(req.body);
        res.json({ item });
      } catch (error) {
        console.log(error);
        res.json({ error });
      }
      break;

    // case 'GET' /* Get a model by its ID */:
    //     try {
    //         const item = await Item.findById(id) as IItem
    //         console.log("find by id item", item)
    //         if (!item) {
    //             return res.status(400).json({ success: false })
    //         }
    //         res.status(200).json({ success: true, data: item })
    //     } catch (error) {
    //         res.status(400).json({ success: false })
    //     }
    //     break

    default:
      res.status(400).json({ success: false });
      break;
  }
}
