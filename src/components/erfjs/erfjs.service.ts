import ErfjModel from "mongo/schema/erfjs";

const getByUserId = (userId: string) => {
  return ErfjModel.findOne({ userId });
};

const insertErfjs = async (payload: any) => {
  await ErfjModel.create({ ...payload });
};

export { getByUserId, insertErfjs };
