const mongoose = require("mongoose");

const connetDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`mongobd connect with server: ${data.connection.host}`);
  });
};
module.exports = connetDatabase;
