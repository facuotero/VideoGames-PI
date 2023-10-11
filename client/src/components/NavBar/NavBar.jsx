import {Link} from "react-router-dom"
import style from "./navBar.module.css"

const NavBar = () => {
 return (
    <div className= {style.mainContainer}>
        <Link to="/home">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/">LogOut</Link>
    </div>
 )
}

export default NavBar;