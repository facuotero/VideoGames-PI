/* eslint-disable no-case-declarations */
import {
  FILTER_BY_SOURCE,
  GENRE_FILTER,
  GET_ALL_GAMES,
  GET_GAME_BY_NAME,
  GET_GENRES,
  PAGINATE,
  ORDER,
} from "./action";

const initialState = {
  games: [],
  genres: [],
  gamesBackup: [],
  gamesFiltered: [],
  filter: false, 
  currentPage: 0,
};

const rootReducer = (state = initialState, action) => {

  let games_per_page = 15;

  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: [...action.payload].splice(0,games_per_page),
        gamesBackup: action.payload
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case PAGINATE:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;
      const first_index =
        action.payload === "next"
          ? next_page * games_per_page
          : prev_page * games_per_page;
      
      if(state.filter){ 
        if(action.payload ==="next" && first_index >= state.gamesFiltered.length) return state; 
        else if(action.payload === "prev" && prev_page < 0) return state;
        
        return {
          ...state,
          games: [...state.gamesFiltered].splice(first_index, games_per_page), 
          currentPage: action.payload === "next"? next_page : prev_page, 
        }
      }

      if(action.payload ==="next" && first_index >= state.gamesBackup.length) return state; 
      else if(action.payload === "prev" && prev_page < 0) return state;
      

      return {
        ...state,
        games: [...state.gamesBackup].splice(first_index, games_per_page), 
        currentPage: action.payload === "next"? next_page : prev_page, 
      }

    case GENRE_FILTER:
    const filterByGenre = [...state.gamesBackup].filter((game) => game.genres.includes(action.payload)) 
    return{
      ...state,
      games: filterByGenre.splice(0, games_per_page),
      gamesFiltered: filterByGenre,
      filter: true,
    }
    
    case ORDER:
      let orderedGames = [...state.gamesBackup].sort((prev,next) => {
        if(action.payload === "asc"){
          if(prev.name.toLowerCase() > next.name.toLowerCase()) return 1;
          if(prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
          return 0;
        }
        if(action.payload === "desc"){
          if(prev.name.toLowerCase() > next.name.toLowerCase()) return -1;
          if(prev.name.toLowerCase() < next.name.toLowerCase()) return 1;
          return 0;
        }
        if(action.payload === "rating"){
          console.log(prev, next)
          if(prev.rating > next.rating) return -1;
          if(prev.rating < next.rating) return 1;
          return 0;
        }
      }) 
    return{
      ...state,
      games: [...orderedGames].splice(0, games_per_page), 
      gamesBackup: orderedGames, 
      currentPage: 0,
    }

    case FILTER_BY_SOURCE:
      let filteredBySource;
      if(action.payload === "api") filteredBySource = [...state.gamesBackup].filter(game => game.created === false);
      if(action.payload === "db") filteredBySource = [...state.gamesBackup].filter(game => game.created === true);
      if(action.payload === "all") filteredBySource = [...state.gamesBackup];
    
      return {
       ...state,
        games: [...filteredBySource].splice(0, games_per_page),
        gamesFiltered: filteredBySource,
        filter: action.payload === "all" ? false : true,
      }

    case GET_GAME_BY_NAME:
    return{
      ...state,
      games: [...action.payload].splice(0, games_per_page), 
      gamesFiltered: action.payload,
      filter: true,
    }
    
    default:
      return { ...state };
  }
};

export default rootReducer;
