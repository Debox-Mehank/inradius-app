import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  companyName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: String,
  locationDropdown: String,
  latitude: String,
  longitude: String,
  radius: String,
  industry: String,
  domain: String,
  qual: String,
  skill1: String,
  skill2: String,
  skill3: String,
  skill4: String,
  isProfileComplete: Boolean,
  isSurveyComplete: Boolean,
});
models = {};

const user = models.userSchema || model("user", userSchema);

export default user;
