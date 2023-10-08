import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./detail.module.css";

const Detail = () => {
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getGameDetailed = async (id) => {
    console.log(id);
    const { data } = await axios.get(`http://localhost:3001/videogames/${id}`);
    setGame(data);
    console.log(game);
    setIsLoading(false);
  };

  useEffect(() => {
    getGameDetailed(id);
    return setGame({}); //cleanDetail
  }, [id]);

  return (
    <div>
      <h1 className={style.detailTitle}>Detail</h1>
      {isLoading ? (
        <p className={style.loading}>Loading...</p> // Muestra el mensaje de "Loading" mientras se cargan los datos
      ) : (
        // Muestra los detalles del juego una vez que los datos se han cargado
        <div className={style.card}>
          <h2>{game.map((game) => game.name)}</h2>
          <img
            src={game.map((game) => game.background_image)}
            alt={game.name}
          />
          <p className={style.platforms}>
            {game.map((game) => game.platforms.join(", "))}
          </p>
          <p>{game.map((game) => game.genres.join(", "))}</p>
          <p>{game.map((game) => game.released)}</p>
          <p className={style.rating}>{game.map((game) => game.rating)}</p>
          <p className={style.description}>
            {game.map((game) => game.description)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Detail;
