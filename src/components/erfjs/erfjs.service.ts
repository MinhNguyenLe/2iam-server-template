import ErfjModel from "mongo/schema/erfjs";

const getByUserId = (userId: string) => {
  return ErfjModel.findOne({ userId });
};

const insertErfjs = async (payload: any) => {
  await ErfjModel.create({ ...payload });
};

const verifyDuplicate = async (userId: string) => {
  const template = await ErfjModel.findOne({ userId });
  return !!template;
};

export default { getByUserId, insertErfjs, verifyDuplicate };
