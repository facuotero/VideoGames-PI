const {
  findAllVideogames,
  findById,
  findByName,
  createGame,
} = require("../controllers/videoGamesControllers");
//interactuamos con body params query

const getVideogameByName = async (req, res) => {
  const { name } = req.query;
  try {
    const games = name ? await findByName(name) : await findAllVideogames();

    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVideogameById = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api"
  try {
    const videogame = await findById(id,source);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createVideogame = async (req, res) => {
  const { name,description, platforms, genres, image, released, rating } =
    req.body;
  try {
    const videogameToCreate = await createGame({
      name,
      description,
      platforms,
      genres,
      image,
      released,
      rating,
    });
    res.status(201).json(videogameToCreate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVideogameById,
  getVideogameByName,
  createVideogame,
};
