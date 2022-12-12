import connectMongo from "../../../utils/connectMongo";
import List, { IListSchema } from "../../../models/model.list";
import type { NextApiRequest, NextApiResponse } from "next";

// adds type to response data
type Data = {
  list?: object;
  data?: object;
  success?: boolean;
  error?: unknown;
};

export default async function listHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method,
  } = req;

  try {
    await connectMongo();

    const list = (await List.create(req.body)) as IListSchema;
    if (!list) {
      return res.status(400).json({ success: false });
    }
    console.log("CREATED DOCUMENT");
    console.log(req.body);
    res.json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }

  //res.status(400).json({ success: false });
}
