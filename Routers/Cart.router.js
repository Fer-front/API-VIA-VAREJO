const express = require("express");
const cartRouter = express.Router();

const SaleController = require("../Controller/Sale.controller");

const saleController = new SaleController();

cartRouter.post("/", saleController.send);
module.exports = cartRouter;
