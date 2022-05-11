import connectMongo from "../../utils/connectDb";
import user from "../../models/userModel";
import lodash from "lodash";
export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "POST") {
    console.log(req.body);
    const id = req.body.id;
    req.body = lodash.omit(req.body, "id");
    const newUser = await user.findByIdAndUpdate(id, req.body);
    console.log(newUser);
    res.json(newUser);
  }
}
