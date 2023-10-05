const {Router} = require("express");
const { getVideogameById, getVideogameByName,createVideogame } = require("../handlers/videoGamesHandlers");
const videoGamesRouter = Router();


videoGamesRouter.get("/", getVideogameByName);

videoGamesRouter.get("/:id",getVideogameById);

videoGamesRouter.post("/", createVideogame);

module.exports = videoGamesRouter;