import connectMongo from "../../utils/connectDb";
import user from "../../models/userModel";
export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "POST") {
    const newUser = await user.create(req.body);
    console.log(newUser);
    res.status(201).json(newUser._id);
  }
}
