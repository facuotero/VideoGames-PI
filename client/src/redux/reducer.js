import { GET_ALL_GAMES, GET_GAME_BY_NAME } from "./action";

const initialState = {
  games: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return { 
        ...state,
         games: action.payload
        };
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
