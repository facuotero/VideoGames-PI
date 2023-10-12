import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  genreFilter,
  getAllGames,
  getGenres,
  paginateVideogames,
  orderCriteria,
  filterBySource,
} from "../../redux/action";
import style from "./home.module.css";

const Home = () => {
  //cuando se monta, que haga el dispatch
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllGames());
  }, [dispatch]);

  const paginate = (event) => {
    dispatch(paginateVideogames(event.target.name));
  };

  const filterByGenres = (event) => {
    dispatch(genreFilter(event.target.value));
  };

  const orderGames = (event) => {
    dispatch(orderCriteria(event.target.value));
  };

  const sourceFilter = (event) => {
    dispatch(filterBySource(event.target.value));
  };

  return (
    <div>
      <div className={style.filters}>
        <select onClick={sourceFilter} className={style.filters}>
          <option value="all">ALL</option>
          <option value="db">DB</option>
          <option value="api">API</option>
        </select>
        <select onClick={orderGames}>
          <option value="rating">{"★"}</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select onChange={filterByGenres} name="genres">
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={paginate} name="prev">
          Prev
        </button>{" "}
        <button onClick={paginate} name="next">
          Next
        </button>
      </div>
      <h1>Rawg Videogames</h1>
      <CardsContainer />
    </div>
  );
};

export default Home;
