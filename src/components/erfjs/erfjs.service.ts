import ErfjModel from "mongo/schema/erfjs";

const getData = (username: string) => {
  return ErfjModel.findOne({ username });
};

export { getData };
