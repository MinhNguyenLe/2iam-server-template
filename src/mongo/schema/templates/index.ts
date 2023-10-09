import { dashboardDB } from "mongo";
import { Schema } from "mongoose";

const TemplatesSchema = new Schema({
  template_name: String,
});
const TemplatesModel = dashboardDB.model("templates", TemplatesSchema);

export default TemplatesModel;
