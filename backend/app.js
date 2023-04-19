const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const fileUpload = require("express-fileupload");
const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 10000,
  })
);
app.use(fileUpload());

// Routes
const clients = require("./routes/clientRoute");
const utils = require("./routes/utilsRoute");
const supplements = require("./routes/supplementRoute");
const expenses = require("./routes/expensesRoute");

app.use("/api/v1", clients);
app.use("/api/v1", utils);
app.use("/api/v1", supplements);
app.use("/api/v1", expenses);

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})

module.exports = app;
