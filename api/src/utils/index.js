const cleanArray = (arr) => 
  arr.map((game) => {
    return {
      id: game.id,
      name: game.name,
      platforms: game.platforms.map((platform) => platform.platform.name),
      genres: game.genres.map((genre) => genre.name),
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      created: false,
    };
  });

const cleanGenresArray = (arr) => {
 
}

module.exports = {
  cleanArray,
  cleanGenresArray
};
