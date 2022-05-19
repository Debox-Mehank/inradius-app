import connectMongo from "../../utils/connectDb";
import user from "../../models/userModel";
export default async function handler(req, res) {
    await connectMongo();
    if (req.method === "POST") {
        const response = await user.find({ email: req.body.email });
        if (response.length !== 0) {
            // const hashp = response
            if (response[0].password === req.body.password) {
                res.status(201).json({ data: response[0], message: "Login Successfull!" });
            } else {
                res.status(201).json({ data: null, message: "Invalid Credentials!" });
            }
            // res.status(201).json("Account Exists");
        } else {
            res.status(201).json({ data: null, message: "Account Doesn't Exist" });
        }
    }
}
