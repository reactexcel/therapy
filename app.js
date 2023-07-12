const express = require("express");
const route = require("./route");
const app = express();
require('dotenv').config();
app.use("/", route);

app.listen(9005, () => {
    console.log("server running...")
});