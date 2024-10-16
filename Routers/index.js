const express = require("express");

const cartRouter = require("./Cart.router");
const testeRouter = require("./Teste.router");

const routers = [
  ["/cart", cartRouter],
  ["/teste", testeRouter],
];

function init(app) {
  routers.forEach((args) => app.use(...args));
}

module.exports = {
  init,
};
