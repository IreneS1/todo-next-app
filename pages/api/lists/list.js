import connectMongo from '../../../utils/connectMongo';
import List from '../../../models/model.list';

export default async function handler(req, res) {

    const {
        query: { id },
        method,
    } = req

    await connectMongo();

    switch (method) {
        case 'POST':
            try {
                const list = await List.create(req.body);
                console.log('CREATED DOCUMENT');
                console.log(req.body);
                res.json({ list });
            } catch (error) {
                console.log(error);
                res.json({ error });
            }
            break

        case 'GET' /* Get a model by its ID */:
            try {
                const list = await List.findById(id)
                if (!list) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: list })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE' /* Delete a model by its ID */:
            try {
                const deletedList = await List.deleteOne({ _id: id })
                if (!deletedList) {
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
