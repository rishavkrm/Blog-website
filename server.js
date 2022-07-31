const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DB_PASSWORD)
mongoose.connect(DB)
.then((con)=>console.log("Connection succesful"))

const app = require('./app')

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
