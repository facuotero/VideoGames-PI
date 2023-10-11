import axios from "axios";

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_NAME = "GET_GAME_BY_ID";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const GET_GENRES = "GET_GENRES"

//Request needed
export const getAllGames = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/videogames");
    console.log(apiData)
    const games = apiData.data;
    dispatch({ type: GET_ALL_GAMES, payload: games });
  };
};
export const getGenres =  () => {
  return async function (dispatch) {
    const {data} = await axios.get("http://localhost:3001/genres");
    const allGenres = data;
    dispatch({type: GET_GENRES, payload: allGenres})

  }
}

//Request needed
export const getGameByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `http://localhost:3001/videogames?search=${name}`
    );
    const user = apiData.data;
    dispatch({ type: GET_GAME_BY_NAME, payload: user });
  };
};


//No request needed
export const filterBySource = (dispatch) => {
  dispatch({ type: FILTER_BY_SOURCE });
};

//Retornan una funcion
//Hacen su request o no
//Sacan la info que les importa o no
//Hacen su dispatch con el type y payload correspondiente
//Dispatch pra modificar el estado global.
