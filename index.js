const express = require("express");
const dbConnect = require("./config/dbConnected");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5001;
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const payment = require("./routes/payment");
const uploadRouter = require("./routes/uploadRoutes")

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/pay", payment);
app.use("/api/upload",uploadRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Sever is running at port ${PORT}`);
});
