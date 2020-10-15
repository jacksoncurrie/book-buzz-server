import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import users from "./routes/users.js";
import books from "./routes/books.js";
import bookReviews from "./routes/bookReviews.js";

dotenv.config();
const app = express();
const port = process.env.PORT ?? 3000;

const mongoDB = process.env.MONGO_URL ?? "mongodb://mongo/bookBuzz";
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log("Connected to database")
);

app.use(bodyParser.json());
app.use(cors());

app.use("/users", users);
app.use("/books", books);
app.use("/bookReveiws", bookReviews);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
