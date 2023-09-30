const mongoose = require("mongoose");

// MongoDB connection:
const database = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Database not connected because: " + err);
    });
};

module.exports = database;