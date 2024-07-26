const mongoose = require("mongoose");
require("dotenv").config;
const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Conneted To Mongodb Databse ${connect.connection.host}`);
  } catch (err) {
    console.log(`Errro in Mongodb ${err}`);
  }
};

module.exports = connectDatabase;
