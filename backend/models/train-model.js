import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainSchema = new Schema({
  from: String,
  to: String,
  weekday: String,
  hour: String,
  ticketprice: Number,
  traintype: String,
  myownid: Number,
});

const TrainModel = mongoose.model('trainModel', trainSchema, 'line');

export default TrainModel;
