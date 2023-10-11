import { GET_ALL_GAMES, GET_GAME_BY_NAME, GET_GENRES } from "./action";

const initialState = {
  games: [],
  genres:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return { 
        ...state,
         games: action.payload
        };
    case GET_GENRES :
      return {
        ...state,
        genres:action.payload
      }
    case GET_GAME_BY_NAME:
      return {
        ...state,
        games:action.payload
      }

    default:
      return { ...state };
  }
};

export default rootReducer;
