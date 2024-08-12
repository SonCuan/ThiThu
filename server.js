import express from 'express';
import connectMongoDB from "./config/dbconfig.js";
import router from "./routes/index.js";

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use("/" , router);

connectMongoDB("mongodb://127.0.0.1:27017/thithu");
app.listen(3000);

