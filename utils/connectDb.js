import mongoose from "mongoose";

const connectMongo = async () =>
  mongoose.connect(
    "mongodb+srv://inradius2022:At0zZI25JqLWR2R1@inradius-server.ez21r.mongodb.net/main?retryWrites=true&w=majority"
  );

export default connectMongo;
