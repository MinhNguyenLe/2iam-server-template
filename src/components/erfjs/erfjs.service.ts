import ErfjModel from "mongo/schema/erfjs";

const getData = (userId: string) => {
  return ErfjModel.findOne({ userId });
};

export { getData };
