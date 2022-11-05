import UserModel from '../models/user-model.js';

const asyncFindUser = async (username) => {
  const result = await UserModel.findOne({ name: username });
  return result;
};

const asyncFindUsersWithNames = async (username) => {
  const result = await UserModel.find({ name: username });
  return result;
};

const asyncGetUserCount = async () => {
  const count = await UserModel.countDocuments({});
  return count;
};

const asyncInsertUser = async (userObj) => {
  const size = await asyncGetUserCount();
  const newUser = await new UserModel({
    name: userObj.name,
    password: userObj.pw,
    type: userObj.type,
    myownid: size + 1,
  });
  await newUser.save();
};

export default {
  asyncFindUser,
  asyncFindUsersWithNames,
  asyncInsertUser,
};
