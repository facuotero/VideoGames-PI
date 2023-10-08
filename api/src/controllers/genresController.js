require("dotenv").config();
const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;
const apiKey = `?key=${API_KEY}`;

const findAllGenres = async () => {
  const dbGenres = await Genre.findAll();
  if (!dbGenres.length) {
    const { data } = await axios(`https://api.rawg.io/api/genres${apiKey}`);
    const genresToSave = data.results.map((genre) => ({ name: genre.name }));// Se guarde sólo el nombre
    await Genre.bulkCreate(genresToSave);
  }
  const dbGenresFull = await Genre.findAll();
  const dbGenresNames = dbGenresFull.map((genre) => genre.name);

  return dbGenresNames;
};

module.exports = findAllGenres;
