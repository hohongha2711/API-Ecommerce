const express = require("express");
const dbConnect = require("./config/dbConnected");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5001;
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const payment = require("./routes/payment");
const uploadRouter = require("./routes/uploadRoutes")
const categoryRouter = require("./routes/categoryRoutes")
dbConnect();
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  sameSite: 'none'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})

app.get('/api/home', (req, res) => {
  res.status(200).json('Welcome, home pge');
})
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/pay", payment);
app.use("/api/upload",uploadRouter);
app.use("/api/category", categoryRouter)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Sever is running at port ${PORT}`);
});
