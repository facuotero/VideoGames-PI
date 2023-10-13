import { Link } from "react-router-dom";
import style from "./navBar.module.css";
import { useDispatch } from "react-redux";
import { getAllGames } from "../../redux/action";

const NavBar = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getAllGames());
  };
  return (
    <div className={style.mainContainer}>
      <Link to="/home" onClick={handleClick}>
        Home
      </Link>
      <Link to="/create">Create</Link>
      <Link to="/">Exit</Link>
    </div>
  );
};

export default NavBar;
