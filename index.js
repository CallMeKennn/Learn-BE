const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const booksRouter = require("./module/booksRoute");
const usersRouter = require("./module/usersRoute");
const rolesRouter = require("./module/rolesRoute");

const app = express();
require("dotenv").config();

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
