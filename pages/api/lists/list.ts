import connectMongo from "../../../utils/connectMongo";
import List, { IList } from "../../../models/model.list";
import type { NextApiRequest, NextApiResponse } from "next";

// adds type to response data
type Data = {
  list?: object;
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

  await connectMongo();

  switch (method) {
    case "POST":
      try {
        const list = (await List.create(req.body)) as IList;
        console.log("CREATED DOCUMENT");
        console.log(req.body);
        res.json({ list });
      } catch (error) {
        console.log(error);
        res.json({ error });
      }
      break;

    // case 'GET' /* Get a model by its ID */:
    //     try {
    //         const list = await List.findById(id) as IList;
    //         if (!list) {
    //             return res.status(400).json({ success: false })
    //         }
    //         res.status(200).json({ success: true, data: list })
    //     } catch (error) {
    //         res.status(400).json({ success: false })
    //     }
    //     break

    // case 'DELETE' /* Delete a model by its ID */:
    //     try {
    //         const deletedList = await List.deleteOne({ _id: id })
    //         if (!deletedList) {
    //             return res.status(400).json({ success: false })
    //         }
    //         res.status(200).json({ success: true, data: {} })
    //     } catch (error) {
    //         res.status(400).json({ success: false })
    //     }
    //     break

    default:
      res.status(400).json({ success: false });
      break;
  }
}
