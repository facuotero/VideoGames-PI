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
  gamesFiltered: [], //creamos esta propiedad para facilitar la combinacion de filtros y ordenamientos y searchbar
  filter: false, //dice al programa si hay o no filtros aplicados
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
      
      //!COMBINAMOS FILTROS CON PAGINADO
      if(state.filter){ //si el estado está filtrado
        if(action.payload ==="next" && first_index >= state.gamesFiltered.length) return state; //corte cuando voy para next
        else if(action.payload === "prev" && prev_page < 0) return state;
        
        return {
          ...state,
          games: [...state.gamesFiltered].splice(first_index, games_per_page), //le decimos donde queremos que empiece a hacer el splice y hasta donde quermeo sque lo haga (cantidad de items x page)
          currentPage: action.payload === "next"? next_page : prev_page, //si toco en el Boton next, mi current page va a ser la siguiente porque voy para adelante, sino la de atras
        }
      }

      if(action.payload ==="next" && first_index >= state.gamesBackup.length) return state; //corte cuando voy para next
      else if(action.payload === "prev" && prev_page < 0) return state;
      

      return {
        ...state,
        games: [...state.gamesBackup].splice(first_index, games_per_page), //le decimos donde queremos que empiece a hacer el splice y hasta donde quermeo sque lo haga (cantidad de items x page)
        currentPage: action.payload === "next"? next_page : prev_page, //si toco en el Boton next, mi current page va a ser la siguiente porque voy para adelante, sino la de atras
      }

    case GENRE_FILTER:
    const filterByGenre = [...state.gamesBackup].filter((game) => game.genres.includes(action.payload)) //al backup para que aplique a toda la totalidad de games todo el tiempo
    return{
      ...state,
      games: filterByGenre.splice(0, games_per_page), //splice para mantener con el paginado
      gamesFiltered: filterByGenre, //va a tener un backup de los juegos filtrados
      filter: true,
    }
    
    case ORDER:
      let orderedGames = [...state.gamesBackup].sort((prev,next) => {
        if(action.payload === "asc"){
          if(prev.name.toLowerCase() > next.name.toLowerCase()) return 1;
          if(prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
          return 0; //son iguales
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
      }) //al backup para que aplique a toda la totalidad de games todo el tiempo
    return{
      ...state,
      games: [...orderedGames].splice(0, games_per_page), //splice para mantener con el paginado
      gamesBackup: orderedGames, //va a tener un backup de los juegos filtrados
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
      games: [...action.payload].splice(0, games_per_page), //splice para mantener con el paginado
      gamesFiltered: action.payload, //va a tener un backup de los juegos filtrados
      filter: true,
    }
    
    default:
      return { ...state };
  }
};

export default rootReducer;
