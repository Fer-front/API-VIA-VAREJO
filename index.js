const validate = require("./Utils/Validate");
const ROUTERS = require("./Routers/index");
const express = require("express");

const App = express();

App.use(express.json());

ROUTERS.init(App);

App.listen(3000, () => console.log("server"));
