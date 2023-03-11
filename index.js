const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const user = require("./routes/user");
const products = require("./routes/product");
const cart = require("./routes/cart");
const order = require("./routes/order");
const app = express();
dotenv.config();

//set mongoose connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

//user routes
app.use("/api/users", auth);
app.use("/api/user", user);

//product routes
app.use("/api/products", products);

//cart routes
app.use("/api/cart", cart);

//order routes
app.use("/api/orders", order);

const PORT = process.env.PORT || 3001;

mongoose.connection.once("open", () => {
  console.log("DB connection established");
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
