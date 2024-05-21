const mongoose = require('mongoose');

const app = require('./app');

const {LOTS_HOST, PORT = 3001} = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(LOTS_HOST).then(
  ()=>{
    app.listen(PORT, () => { console.log("Database connection successful!")})
}).catch( error =>{
  console.log(error.message);
  process.exit(1);
})