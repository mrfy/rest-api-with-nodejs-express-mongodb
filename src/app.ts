import express from 'express';
import morgan from 'morgan';
//IMPORT ROUTEe
import postRoute from './routes/posts';
import reportsRoute from './routes/reports';
import skillRoute from './routes/skills';
import userRoute from './routes/user';
import workRoute from './routes/work';

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

//INIT ROUTE
app.use('/user', userRoute);
app.use('/posts', postRoute);
app.use('/work', workRoute);
app.use('/skill', skillRoute);
app.use('/reports', reportsRoute);

//MONGODB CONNECTION
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB conected ...'))
  .catch((err: any) => console.log('🚀 error !!', err));
//START SERVER

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
