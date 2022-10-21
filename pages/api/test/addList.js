import connectMongo from '../../../utils/connectMongo';
import List from '../../../models/model.list';

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
        const list = await List.create(req.body);
        console.log('CREATED DOCUMENT');

        res.json({ list });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
