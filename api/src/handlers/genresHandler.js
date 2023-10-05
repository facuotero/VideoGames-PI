const findAllGenres = require("../controllers/genresController");

const getAllGenres = async (req, res) => {
  try {
    const allGenres = await findAllGenres();
    res.status(200).json(allGenres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAllGenres;
