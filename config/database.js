const mongoose = require("mongoose");

const dbURI="mongodb://127.0.0.1:27017/ShoppingApplication";

const connectDb = async () => {
    try {
      const connect = await mongoose.connect(dbURI);
      console.log(
        "Database connected: ",
        connect.connection.host,
        connect.connection.name
      );
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };
  
  module.exports = connectDb;