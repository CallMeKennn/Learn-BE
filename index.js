import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

import booksRouter from "./module/booksRoute.js";
import usersRouter from "./module/usersRoute.js";
import rolesRouter from "./module/rolesRoute.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// apply middleware
app.use(bodyParser.json());
app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);

connectDB();
// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
