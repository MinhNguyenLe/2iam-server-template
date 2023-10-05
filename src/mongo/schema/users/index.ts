import { dashboardDB } from "mongo";
import { Schema } from "mongoose";

const UsersSchema = new Schema({
  username: String,
  oauth: {
    google: {
      id: String,
      displayName: String,
      photos: [{ value: String }],
    },
  },
});
const UsersModel = dashboardDB.model("users", UsersSchema);

export default UsersModel;
