import connectMongo from '../../../utils/connectMongo';
import Item from '../../../models/model.item';
import type { NextApiRequest, NextApiResponse } from 'next'

// adds type to response data
type Data = {
    data?: object
    success: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const itemId = req.query.deleteId
    console.log("query:", itemId)
    console.log("req body", req.body)

    // connect to database
    await connectMongo();

    try {
        const item = await Item.findByIdAndUpdate(itemId, req.body)
        if (!item) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: item })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
