
const cleanDescription = (description) => {
const regexToClean = new RegExp('<\s*[^>]*>','g');
description = description.replace(regexToClean, '');
return description
}

const cleanArray = (dbGame) =>
 
  dbGame.map((game) => {
    return {
      id: game.id,
      name: game.name,
      platforms: game.platforms,
      genres: game.genres.map(genre => genre.name),
      image: game.background_image,
      released: game.released,
      description: game.description,
      created: true
    };
  });
  
const cleanGenres = (arr) => {
return arr.map((game) => {
  const formattedGame = game.toJSON();
  formattedGame.genres = game.Genre.map((genre) => genre.name);
  delete formattedGame.Genres;
  return formattedGame;
})}

 const cleanObject = (game) => {
  return {
    id: game.id,
    name: game.name,
    platforms: game.platforms,
    genres: game.Genre?.map(genre => genre.name),
    image: game.image,
    released: game.released,
    description: game.description,
    created: true
  }
 }
 
module.exports = {
  cleanArray,
  cleanObject,
  cleanDescription,
  cleanGenres
};
