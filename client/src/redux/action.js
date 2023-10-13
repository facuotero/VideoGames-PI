import axios from "axios";

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_NAME = "GET_GAME_BY_NAME";
export const PAGINATE = "PAGINATE";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const GENRE_FILTER = "GENRE_FILTER";
export const GET_GENRES = "GET_GENRES";
export const ORDER = "ORDER";

export const getAllGames = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/videogames");
      console.log(apiData);
      const games = apiData.data;
      dispatch({ type: GET_ALL_GAMES, payload: games });
    } catch (error) {
      alert(
        `No se pudo cargar la pagina por el siguiente ${error.games.response.error}`
      );
    }
  };
};

export const paginateVideogames = (order) => {
  return async function (dispatch) {
    try {
      dispatch({ type: PAGINATE, payload: order });
    } catch (error) {
      alert(
        `No se pudo cargar la pagina por el siguiente ${error.games.response.error}`
      );
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/genres");
      const allGenres = data;
      dispatch({ type: GET_GENRES, payload: allGenres });
    } catch (error) {
      alert(`No se pudo cargar la pagina por el siguiente ${error}`);
    }
  };
};

export const getGameByName = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      const user = apiData.data;
      dispatch({ type: GET_GAME_BY_NAME, payload: user });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const genreFilter = (genre) => {
  return async function (dispatch) {
    console.log(genre);
    try {
      dispatch({
        type: GENRE_FILTER,
        payload: genre,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const orderCriteria = (order) => {
  console.log(order);
  return async function (dispatch) {
    try {
      dispatch({
        type: ORDER,
        payload: order,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const filterBySource = (source) => {
  return async function (dispatch) {
    try {
      dispatch({ type: FILTER_BY_SOURCE, payload: source});
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
