import { Link } from "react-router-dom";
import style from "./landing.module.css"

const Landing = () => {
    return (
        <div className={style.landing}>
        <Link to="home">
            <img className={style.sticker} src={"./src/assets/pngegg (1).png"}/>
        </Link>
        <Link to="home">
            <button className={style.button}>
                Explore the Gaming World
            </button>
        </Link>
        </div>
    )
}

export default Landing;
