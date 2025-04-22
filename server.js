const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // read our variables from the file and save them into nodejs environment variable
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const app = require('./app');
const port = 3000;
app.listen(port, () => {
  console.log('start getting requests');
});
