//import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./cardsContainer.module.css";
import { useSelector } from "react-redux";

//SMART
const CardsContainer = () => {

  const games = useSelector(state=>state.games)

  return (
    <div className={style.container}>
      
        {games.map((game) => (
           <Card 
           key={game.id}
           id={game.id}
           image={game.image}
           name={game.name} 
           genres={game.genres}
           created = {game.created}
            />
            ))}
    </div>
  );
};
/*Componente que toma un array de juegos y
 por cada juego renderiza un componente Card.
 games va a ser DEL STORE*/

export default CardsContainer;
