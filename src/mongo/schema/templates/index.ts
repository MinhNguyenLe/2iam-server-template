import { dashboardDB } from "mongo";
import { Schema } from "mongoose";

const TemplatesSchema = new Schema({
  template_name: String,
  positions: [String],
  catalog: [String],
  created_at: Date,
});
const TemplatesModel = dashboardDB.model("templates", TemplatesSchema);

export default TemplatesModel;
