import mongoose from 'mongoose';
import mongoosemodels from './mongoosemodels.js';

const { LineModel, UserModel, ReservationModel } = mongoosemodels;

mongoose.connect('mongodb://localhost:27017/trains', { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to db');
});

async function asyncGetCount() {
  const count = await LineModel.countDocuments({});
  return count;
}

async function asyncGetUserCount() {
  const count = await UserModel.countDocuments({});
  return count;
}

async function asyncInsertTrain(insertedObj) {
  const biggestId = await LineModel.findOne().sort({ myownid: -1 });

  const newTrain = await new LineModel({
    from: insertedObj.from,
    to: insertedObj.to,
    weekday: insertedObj.weekday,
    hour: insertedObj.hour,
    ticketprice: parseInt(insertedObj.ticketprice, 10),
    traintype: insertedObj.traintype,
    myownid: biggestId.myownid + 1,
  });

  await newTrain.save((err) => {
    if (err) {
      throw err;
    }
  });
}

async function asyncSearchTrain(trainObj) {
  const res = await LineModel.find({
    from: trainObj.from,
    to: trainObj.to,
    $and: [
      { ticketprice: { $gte: parseInt(trainObj.minprice, 10) } },
      { ticketprice: { $lte: parseInt(trainObj.maxprice, 10) } },
    ],
  });
  return res;
}

async function asyncSearchPartialFrom(trainObj) {
  const res = await LineModel.find({
    from: trainObj.from,
    $and: [
      { ticketprice: { $gte: parseInt(trainObj.minprice, 10) } },
      { ticketprice: { $lte: parseInt(trainObj.maxprice, 10) } },
    ],
  });
  return res;
}

async function asyncSearchPartialTo(trainObj) {
  const res = await LineModel.find({
    to: trainObj.to,
    $and: [
      { ticketprice: { $gte: parseInt(trainObj.minprice, 10) } },
      { ticketprice: { $lte: parseInt(trainObj.maxprice, 10) } },
    ],
  });
  return res;
}

async function asyncMakeReservation(idsObj) {
  const newRes = await new ReservationModel({
    userid: idsObj.idUser,
    trainid: idsObj.id,
  });

  await newRes.save((err) => {
    if (err) {
      throw err;
    }
  });
}

async function asyncGetAll() {
  // { ticketprice: 0, traintype: 0 }
  let all = await LineModel.find();
  if (all.length === 0) {
    all = 'Not found';
  }
  return all;
}

async function asyncGetMissing(id) {
  let missing = await LineModel.find({ myownid: id }, { ticketprice: 1, traintype: 1 });
  if (missing.length === 0) {
    missing = 'Not found';
  }
  return missing;
}

async function asyncGetAllIDs() {
  const all = await LineModel.find({}, { _id: 0, myownid: 1 });
  return all;
}

async function asyncGetAllUserNames() {
  const all = await UserModel.find({}, { _id: 0, name: 1, myownid: 1 });
  return all;
}

async function asyncGetReservations(tId) {
  const all = await ReservationModel.find({ trainid: parseInt(tId, 10) });
  return all;
}

async function asyncGetSpecificTrain(tId) {
  const all = await LineModel.find({ myownid: parseInt(tId, 10) });
  return all;
}

async function asyncDeleteRes(uid, tid) {
  await ReservationModel.deleteOne({ userid: uid, trainid: tid });
}

async function asyncFindUser(username) {
  const result = await UserModel.findOne({ name: username });
  return result;
}

async function asyncFindUsersWithNames(username) {
  const result = await UserModel.find({ name: username });
  return result;
}

async function asyncInsertUser(userObj) {
  const size = await asyncGetUserCount();

  const newUser = await new UserModel({
    name: userObj.name,
    password: userObj.pw,
    type: userObj.type,
    myownid: size + 1,
  });

  await newUser.save();
}

async function asyncGetPriv(userObj) {
  const result = await UserModel.findOne({ name: userObj.name, myownid: userObj.id }, { type: 1 });
  console.log(result);
  return result;
}

async function asyncDeleteTrain(trainId) {
  await LineModel.deleteOne({ myownid: trainId });
}

export default {
  asyncInsertTrain,
  asyncSearchTrain,
  asyncGetCount,
  asyncMakeReservation,
  asyncGetAll,
  asyncGetAllIDs,
  asyncGetAllUserNames,
  asyncGetReservations,
  asyncGetSpecificTrain,
  asyncGetMissing,
  asyncDeleteRes,
  asyncFindUser,
  asyncFindUsersWithNames,
  asyncInsertUser,
  asyncGetPriv,
  asyncDeleteTrain,
  asyncSearchPartialFrom,
  asyncSearchPartialTo,
};
