import TrainModel from '../models/train-model.js';

const asyncDeleteTrain = async (trainId) => {
  await TrainModel.deleteOne({ myownid: trainId });
};

const asyncInsertTrain = async (insertedObj) => {
  const biggestId = await TrainModel.findOne().sort({ myownid: -1 });
  const newTrain = await new TrainModel({
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
};

const asyncSearchTrain = async (trainObj) => {
  const res = await TrainModel.find({
    from: trainObj.from,
    to: trainObj.to,
    $and: [
      { ticketprice: { $gte: parseInt(trainObj.minprice, 10) } },
      { ticketprice: { $lte: parseInt(trainObj.maxprice, 10) } },
    ],
  });
  return res;
};

const asyncSearchPartialFrom = async (trainObj) => {
  const res = await TrainModel.find({
    from: trainObj.from,
    $and: [
      { ticketprice: { $gte: parseInt(trainObj.minprice, 10) } },
      { ticketprice: { $lte: parseInt(trainObj.maxprice, 10) } },
    ],
  });
  return res;
};

const asyncSearchPartialTo = async (trainObj) => {
  const res = await TrainModel.find({
    to: trainObj.to,
    $and: [
      { ticketprice: { $gte: parseInt(trainObj.minprice, 10) } },
      { ticketprice: { $lte: parseInt(trainObj.maxprice, 10) } },
    ],
  });
  return res;
};

const asyncGetAll = async () => {
  let all = await TrainModel.find();
  if (all.length === 0) {
    all = 'Not found';
  }
  return all;
};

export default {
  asyncDeleteTrain,
  asyncInsertTrain,
  asyncSearchTrain,
  asyncSearchPartialFrom,
  asyncSearchPartialTo,
  asyncGetAll,
};
