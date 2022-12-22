import connectMongo from "../../../utils/connectMongo";
import List, { IListSchema } from "../../../models/model.list";
import type { NextApiRequest, NextApiResponse } from "next";

// adds type to response data
// type Data = {
//   list?: object;
//   data?: object;
//   success?: boolean;
//   error?: unknown;
// };

export default async function listHandler(
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

    await connectMongo();

    const list = (await List.create(req.body)) as IListSchema;
    if (!list) {
      return res.status(400).json({ success: false });
    }
    console.log("CREATED DOCUMENT");
    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json((error as Error).message);
  }
}
