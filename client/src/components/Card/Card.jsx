import style from "./card.module.css"
import {Link, useNavigate} from "react-router-dom"

//DUMB. Presentacional. Recibe props y las renderiza

// eslint-disable-next-line react/prop-types
const Card = ({id,name,genres,image}) => {
  const navigate = useNavigate()
  return (
    <div className={style.card}>
      <Link to={`/detail/${id}`}>
      <img src ={image} className={style.imgCard} />
      </Link>
        <p className={style.name} onClick={() => navigate(`/detail/${id}`)}>{name}</p>
        {/* eslint-disable-next-line react/prop-types*/}
        <p className={style.genres}>{genres.join(", ")}</p>
    </div>
  );
};
/* Este componente nos tiene que mostrar la info
 de cada juego mapeado y ademas darnos un link
 para ir al detalle del usuario en cuestión. La imagen
 o el nombrepueden ser links que nos lleven al detalle
 ese juego*/

export default Card;
