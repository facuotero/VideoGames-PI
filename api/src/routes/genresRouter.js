const {Router} = require("express");
const genresRouter = Router();
const getAllGenres = require("../handlers/genresHandler");


genresRouter.get("/",getAllGenres);

module.exports = genresRouter;