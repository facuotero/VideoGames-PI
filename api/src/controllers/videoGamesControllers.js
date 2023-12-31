const { Videogame, Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const apiKey = `?key=${API_KEY}`;
const { cleanArray} = require("../utils/index");
const { Op } = require("sequelize");
const db = require("../db");
//Creamos el controller para que interactue con el modelo
//Son funciones async porque trabajan con los metodos de los modelos, y los mismos manejan,retornan promesas.
//Usamos Async cuando trabajamos con promesas.
//LOS METODOS DE LOS MODELOS SON PROMESAS.
//Necesito un catch bien posicionado para manejar el error bien.
//throw error busca el catch más cercano.
const findAllVideogames = async () => {
  //!BDD
  const dbVideogames = await Videogame.findAll({
    include: { model: Genre, attribute: ["name"] },
  });

  const videogamesNeeded = 100;
  const apiGames = [];
  let currentPage = 1;
  
  //!API
  while(apiGames.length < videogamesNeeded){

    const { data } = await axios(`https://api.rawg.io/api/games${apiKey}&page=${currentPage}`);
    const videogames = data.results;

    if (!videogames.length && !dbVideogames){

      throw Error("We couldn't find any videogame");
    }
    
    const apiVideogames = cleanArray(videogames);
    apiGames.push(...apiVideogames)
    currentPage++;
  }
  //!LIMPIEZA
  const dbGamesCleaned = dbVideogames.map((game) => {
    const superClean = game.genres.map((g)=> g.name)
    return {
      id: game.id,
      name: game.name,
      platforms: game.platforms,
      genres: superClean,
      image: game.image,
      released: game.released,
      description: game.description,
      created: true,
    };
    }
  );

  //!TODOS
  return [...dbGamesCleaned, ...apiGames];
};

const findById = async (id, source) => {
  if (source === "db") {
    let dbGame = await Videogame.findByPk(id, {
      include: { model: Genre, attributes: ["name"] },
    });
    if (dbGame) {
      dbGame.toJSON();
      return {
        id: dbGame.id,
        name: dbGame.name,
        platforms: dbGame.platforms,
        genres: dbGame.Genres?.map(genre => genre.map(g => g.name)),
        image: dbGame.image,
        released: dbGame.released,
        rating: dbGame.rating,
        description: dbGame.description,
        created: true
      };
    }
    throw Error(`We could't find any game with this ID: ${id}`);
  } else {
    const { data } = await axios(
      `https://api.rawg.io/api/games/${id}${apiKey}`
    );
    let gameApi = data;
    if (!gameApi) throw Error(`We could't find any game with this ID: ${id}`);
    return {
      id: gameApi.id,
      name: gameApi.name,
      platforms: gameApi.platforms.map((platform) => platform.platform.name),
      genres: gameApi.genres.map((genre) => genre.name),
      image: gameApi.background_image,
      released: gameApi.released,
      rating: gameApi.rating,
      description: gameApi.description,
      created: false,
    };
  }
};

const findByName = async (name) => {
  const dbGame = await Videogame.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
    limit: 15,
  });
  const { data } = await axios(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );
  let apiGame = data.results;
  let apiGameCleaned = cleanArray(apiGame);

  let apiFiltered = apiGameCleaned.filter(
    (game) => game.name.toLowerCase().includes(name.toLowerCase())
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
  console.log(game.genres);
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
