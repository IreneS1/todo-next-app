import connectMongo from '../../../utils/connectMongo';
import Item from '../../../models/model.item';

export default async function addTest(req, res) {
    try {
        await connectMongo();
        const item = await Item.create(req.body);
        console.log('CREATED DOCUMENT');
        console.log(req.body);
        res.json({ item });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}