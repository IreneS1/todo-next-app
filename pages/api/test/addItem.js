import connectMongo from '../../../utils/connectMongo';
import Item from '../../../models/model.item';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTest(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');
        const item = await Item.create(req.body);
        console.log('CREATED DOCUMENT');
        console.log(req.body);
        res.json({ item });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}