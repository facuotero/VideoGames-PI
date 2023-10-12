
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
      created: false,
    };
  });
  
 const cleanDbGenres = (videogame) => {
  videogame.map((game) => {
  const superClean = game.genres.map((g)=> g.name)
  return {
    id: game.id,
    name: game.name,
    platforms: game.platforms,
    genres: superClean,
    image: game.image,
    released: game.released,
    description: game.description,
    created: true
  }
 })}


module.exports = {
  cleanArray,
  cleanDescription,
  cleanDbGenres
};
