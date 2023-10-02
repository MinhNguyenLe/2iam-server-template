import ErfjModel from "mongo/schema/erfjs";

const getData = () => {
  return ErfjModel.find({});
};

export { getData };
