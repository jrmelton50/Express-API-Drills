const express = require("express");
const path = require("path");
const apiRouter = require("./routes");
const cors = require("cors");

let app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "../client")));
app.listen(3000);
