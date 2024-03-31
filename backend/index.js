require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use("/api", routes);

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const cluster = "bogorm.spuc1f0.mongodb.net/bogorm";

mongoose
  .connect(`mongodb+srv://${username}:${password}@${cluster}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Bogorm Backend listening at port 5000");
    });
  });
