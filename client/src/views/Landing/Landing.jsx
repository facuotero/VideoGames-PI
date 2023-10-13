import { Link } from "react-router-dom";
import style from "./landing.module.css";
import video from "../../assets/video.mp4";

const Landing = () => {
    return (
        <div className={style.landing}>
            <video
             src={video}
             className={style.video}
                autoPlay
                loop
                muted
            ></video>
        <Link to="home">
            <button className={style.button}>
                Enter to the Gaming World
            </button>
        </Link>
        </div>
    )
}

export default Landing;
