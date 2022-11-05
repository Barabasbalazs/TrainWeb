import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  myownid: Number,
  name: String,
  type: String,
  password: [],
});

const UserModel = mongoose.model('userModel', userSchema, 'user');

export default UserModel;
