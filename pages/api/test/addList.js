import connectMongo from '../../../utils/connectMongo';
import List from '../../../models/model.list';

export default async function addTest(req, res) {
    try {
        await connectMongo();
        const list = await List.create(req.body);
        console.log('CREATED DOCUMENT');

        res.json({ list });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
