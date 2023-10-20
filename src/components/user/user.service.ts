import AppError from "@core/utils/appError";
import logger from "@core/utils/logger";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import UsersModel from "mongo/schema/users";

let userStorage: Array<IUser> = [];

const create = (user: IUser): boolean => {
  if (userStorage.push(user)) {
    logger.debug(`User created: %O`, user);
    return true;
  }
  throw new AppError(httpStatus.BAD_GATEWAY, "User was not created!");
};

const read = (id: string): IUser => {
  logger.debug(`Sent user.id ${id}`);
  return [...userStorage].pop();
};

const update = (user: IUser): boolean => {
  userStorage = userStorage.map((u) =>
    u.id === user.id ? { ...u, updatedField: 1 } : u
  );
  return true;
};

const deleteById = (id: string) => {
  userStorage = userStorage.filter((user) => user.id !== id);
  logger.debug(`User ${id} has been removed`);
  return true;
};

const updateResumeById = async (userId: string, resume: any) => {
  console.log(resume)
  const user: any = await UsersModel.findOne({ _id: userId });

  user.resume = resume;
  await user.save();
};

export { create, read, update, deleteById, updateResumeById };
