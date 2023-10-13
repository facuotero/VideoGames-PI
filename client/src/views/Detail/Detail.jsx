import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./detail.module.css";
import { cleanDescription } from "../../utils";

const Detail = () => {
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getGameDetailed = async (id) => {
    console.log(id);
    const { data } = await axios.get(`http://localhost:3001/videogames/${id}`);
    setGame(data);
    console.log(data);
    setIsLoading(false);
  };
  

  useEffect(() => {
    getGameDetailed(id);
    return setGame({}); //cleanDetail
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h1 className={style.detailTitle}>Game Detail</h1>
      {isLoading ? (
        <p className={style.loading}>Loading...</p> // Muestra el mensaje de "Loading" mientras se cargan los datos
      ) : (
        // Muestra los detalles del juego una vez que los datos se han cargado
        <div className={style.card}>
          <h2>{game.name}</h2>
          <img
            src={game.image}
            alt={game.name}
          />
          <p>{game.id}</p>
          <p className={style.platforms}>
            {game.platforms}
          </p>
          <p>{game.genres}</p>
          <p>{game.released}</p>
          <p className={style.rating}>{"★"}{game.rating}</p>
          <p className={style.description}>
            {cleanDescription(game.description)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Detail;
