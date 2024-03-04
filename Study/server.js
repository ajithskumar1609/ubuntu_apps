const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

//console.log(process.env);

const DB = process.env.LOCAL_DATABASE;
console.log(process.env.NODE_ENV);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    //console.log(con.connection);
    console.log('database connected');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening in ${port}.......`);
});
