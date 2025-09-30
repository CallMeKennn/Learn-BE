const express = require("express");
const bodyParser = require("body-parser")

const app = express();
const PORT = 3002;

// apply middleware
app.use(bodyParser.json());

const notesRouter = require("./module/noteRoute")
app.use("/notes", notesRouter)

// route đơn giản
app.get("/", (req, res) => {
  console.log("Vào đây /", { req, res });
  res.send("Hello Express!");
});

app.get("/about", (req, res) => {
  console.log("Vào đây /about", { req, res });

  res.send("This is Express API 🚀");
});

app.get("/contact", (req, res) => {
  const myEmail = "huyhoang13199@gmail.com ";
  res.json({ email: myEmail });
});

app.get("/time", (req, res) => {
  res.json({ currentTime: new Date() });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
