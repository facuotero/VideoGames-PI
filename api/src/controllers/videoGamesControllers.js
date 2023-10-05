const { Videogame, Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const apiKey = `?key=${API_KEY}`;
const { cleanArray, cleanObject } = require("../utils/index");
const { Op } = require("sequelize");
const db = require("../db");
//Creamos el controller para que interactue con el modelo
//Son funciones async porque trabajan con los metodos de los modelos, y los mismos manejan,retornan promesas.
//Usamos Async cuando trabajamos con promesas.
//LOS METODOS DE LOS MODELOS SON PROMESAS.
//Necesito un catch bien posicionado para manejar el error bien.
//throw error busca el catch más cercano.
const findAllVideogames = async () => {
  const dbVideogames = await Videogame.findAll({
    include: { model: Genre, attribute: ["name"] },
  });

  const { data } = await axios(`https://api.rawg.io/api/games${apiKey}`);
  const videogames = data.results;
  const apiVideogames = cleanArray(videogames);

  if (!videogames && !dbVideogames)
    throw Error("We couldn't find any videogame");

  return [...dbVideogames, ...apiVideogames];
};

const findById = async (id) => {
  if (isNaN(id)) {
    let dbGame = await Videogame.findByPk(id, {
      include: { model: Genre, attribute: ["name"] },
    });
    if (dbGame) return dbGame;
    throw Error(`We could't find any game with this ID: ${id}`);
  }

  const { data } = await axios(`https://api.rawg.io/api/games/${id}${apiKey}`);
  let gameApi = data;
  if (!gameApi) throw Error(`We could't find any game with this ID: ${id}`);
  return cleanArray([gameApi]);
};

const findByName = async (name) => {
  const dbGame = await Videogame.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
    limit: 15,
  });
  const { data } = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
  let apiGame = data.results;
  let apiGameCleaned = cleanArray(apiGame);

  let apiFiltered = apiGameCleaned.filter(
    (game) => game.name.toLowerCase() === name.toLowerCase()
  );

  if (!apiFiltered.length && !dbGame.length)
    throw Error(`We couldn't find any game called: ${name}`);

  return [...apiFiltered, ...dbGame];
};

const createGame = async (game) => {
  const existingGame = await Videogame.findOne({
    where: { name: { [Op.iLike]: `%${game.name}%` }, created: true },
  });
  if (existingGame)
    throw new Error(`A game called: ${game.name} already exists`);

  const genresSaved = await Genre.findAll({
    where: { name: game.genres },
  });

  const newGame = await Videogame.create({
    name: game.name,
    description: game.description,
    platforms: game.platforms,
    image: game.image,
    released: game.released,
    rating: game.rating,
  });
  console.log(genresSaved);
  await newGame.addGenres(genresSaved);
  return newGame;
};

module.exports = {
  findAllVideogames,
  findById,
  findByName,
  createGame,
};
