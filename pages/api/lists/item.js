import connectMongo from '../../../utils/connectMongo';
import Item from '../../../models/model.item';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    // connect to database
    await connectMongo();

    switch (method) {
        case 'POST': // Create
            try {
                const item = await Item.create(req.body);
                console.log('CREATED DOCUMENT');
                console.log(req.body);
                res.json({ item });
            } catch (error) {
                console.log(error);
                res.json({ error });
            }
            break

        case 'GET' /* Get a model by its ID */:
            try {
                const item = await Item.findById(id)
                if (!item) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: item })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE' /* Delete a model by its ID */:
            try {
                const deletedItem = await Item.deleteOne({ _id: id })
                if (!deletedItem) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }

}
