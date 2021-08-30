import express from 'express';

import mongoose from 'mongoose';

import {PORT, DB_URI} from './config/index.js'

import route from './routes/index.js'

import errorHandler from './middleware/errorHandler.js'

const app = express();

app.use(express.json());

app.use('/api', route);

app.use(errorHandler);

mongoose.connect( DB_URI,{
   useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => {
  console.log('connected');
});

app.listen(PORT, (req, res) => {
   console.log(`server is up at ${PORT}`);
})

