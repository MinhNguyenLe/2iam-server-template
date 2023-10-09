import ErfjModel from "mongo/schema/erfjs";

const getByUserId = (username: string) => {
  return ErfjModel.findOne({ username });
};

const insertErfjs = async (payload: any) => {
  console.log(payload)
  await ErfjModel.create({ ...payload });
};

export { getByUserId, insertErfjs };
