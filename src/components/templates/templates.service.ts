import TemplatesModel from "mongo/schema/templates";

const getTemplates = () => {
  return TemplatesModel.find({}, { name: "$template_name" });
};

export { getTemplates };
