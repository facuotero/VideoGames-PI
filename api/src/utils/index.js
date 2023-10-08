const cleanDescription = (description) => {
const regexToClean = new RegExp('<\s*[^>]*>','g');
description = description.replace(regexToClean, '');
return description
}

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
      description: game.description,
      created: false,
    };
  });

  const cleanGenre = (arr) => {
    return arr.map((game) => {
      const gameAdecuated = game.toJSON();
      gameAdecuated.genres = gameAdecuated.Genres.map((genre) => genre.name);
      delete gameAdecuated.Genres;
      return gameAdecuated;
    });
  };

module.exports = {
  cleanArray,
  cleanGenre,
  cleanDescription
};
