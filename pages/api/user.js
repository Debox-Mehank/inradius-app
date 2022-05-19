import connectMongo from "../../utils/connectDb";
import user from "../../models/userModel";
export default async function handler(req, res) {
    await connectMongo();
    if (req.method === "POST") {
        const response = await user.find({ _id: req.body.id });
        if (response.length !== 0) {
            res.status(201).json({ user: response[0] });
        } else {
            res.status(201).json({ data: null });
        }
    }
}
