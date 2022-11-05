import mongoose from 'mongoose';

const connectToDb = () => {
  mongoose.connect('mongodb://localhost:27017/trains', { useNewUrlParser: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to db');
  });
};

export default connectToDb;
