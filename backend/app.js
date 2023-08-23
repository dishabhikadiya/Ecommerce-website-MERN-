const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const filleUpLoad = require("express-fileupload");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(filleUpLoad());
// route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/oderRoute");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
// error for middleware
app.use(errorMiddleware);
module.exports = app;