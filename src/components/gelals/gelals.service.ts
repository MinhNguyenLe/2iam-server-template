import GelalsModel from "mongo/schema/gelal";
import UsersModel from "mongo/schema/users";

const getByUserId = async (userId: string) => {
  const gelal = await GelalsModel.findOne({ userId });
  if (!gelal) {
    return undefined;
  }

  const user = await UsersModel.findOne({ _id: userId });
  return user?.resume;
};

const insert = async (payload: any) => {
  await GelalsModel.create({ ...payload });
};

export default { getByUserId, insert };
