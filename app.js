const express = require("express");
const cors = require('cors')
const app = express();
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();

app.use(cors())
app.use(express.static("public"));
app.use(express.json()); //Used to parse JSON bodies

var doscg = require("./controller/doscgController");

app.get("/api/sequence", (req, res) => {
  const result = doscg.sequence()
  res.json(result);
});

app.get("/api/equation", (req, res) => {
  const result = doscg.equation()
  res.json(result);
});

app.get("/api/getRoutes", async (req, res) => {
  const result = await doscg.getRoutes()
  res.json(result)
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
