import {Link} from "react-router-dom"
import style from "./navBar.module.css"

const NavBar = () => {
 return (
    <div className= {style.mainContainer}>
        <Link to="/home">Home</Link>
        <Link to="/create">Form</Link>
    </div>
 )
}

export default NavBar;