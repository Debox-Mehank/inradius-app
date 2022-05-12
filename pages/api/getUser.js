import connectMongo from "../../utils/connectDb";
import user from "../../models/userModel";
export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "POST") {
    const response = await user.find({ email: req.body.email });
    console.log(response);
    if (response.length !== 0) {
      res.status(201).json("Account Exists");
    } else {
      res.status(201).json("Account Doesn't Exist");
    }
  }
}
