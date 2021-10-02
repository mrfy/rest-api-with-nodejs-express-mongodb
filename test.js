console.log('test');

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const data = {
  startTime: new Date(),
  endTime: new Date(),
  equipment: ObjectId(),
  states: [],
};

let startTime = new Date('2021-05-01 00:00:00');
let endTime = new Date(startTime.getTime() + 1000);

for (let index = 0; index < 250; index++) {
  data.states.push({
    startTime,
    endTime,
    state: ObjectId('507f1f77bcf86cd799439011'),
  });

  startTime = new Date(startTime.getTime() + 1000);
  endTime = new Date(startTime.getTime() + 1000);
}

mongoose
  .connect(
    'mongodb://localhost:27018/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  )
  .then((mongoose) => {
    const db = mongoose.connection.useDb('test');
    const collection = db.collection('states');
    console.log('MongoDB conected OK 💿');

    collection
      .insertOne(data)
      .then(() => console.log('ok'))
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => console.log('🚀 error !!', err));
