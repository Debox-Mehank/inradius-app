import connectMongo from "../../utils/connectDb";
import user from "../../models/userModel";
import lodash from "lodash";
import { isPointWithinRadius } from "geolib";
export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "POST") {
    const id = req.body.id;
    req.body = lodash.omit(req.body, "id");
    const newUser = await user.findById(id);
    const list = await user.find({
      type: newUser.type === "employer" ? "employee" : "employer",
      industry: newUser.industry,
      domain: newUser.domain,
      $or: [
        { toPay: { $gte: newUser.expectedPay } },
        { fromPay: { $lte: newUser.expectedPay } },
      ],
    });
    const newFilter = list.filter((ind) =>
      isPointWithinRadius(
        {
          latitude: parseFloat(ind.latitude),
          longitude: parseFloat(ind.longitude),
        },
        {
          latitude: parseFloat(newUser.latitude),
          longitude: parseFloat(newUser.longitude),
        },
        parseInt(newUser.radius) * 1000
      )
    );

    console.log(newFilter);
    res.json(newFilter);
  }
}
