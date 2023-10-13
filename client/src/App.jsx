import "./App.css";
import {Home,Landing,Detail,Form} from "./views/main";
//import SearchBar from "./components/SearchBar/SearchBar";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, useLocation} from "react-router-dom";

function App() {

  const location = useLocation();


  return (
    
    <div>
      {location.pathname !== "/" && <NavBar/>} {/*Si no estamos en la landing renderiza la navBar*/}
      {/*location.pathname === "/home" && <SearchBar/>*/}
       <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path ="/home" element={<Home/>} />
          <Route path ="/detail/:id" element={<Detail />}/>
          <Route path ="/create" element={<Form/>} />
       </Routes>

    </div>
  );
}
/*      <div className={style.searchBar}>
        {location.pathname !== "/" && location.pathname !== "/form"
          && <img
            className={style.img}
            src="../src/assets/img/12.png" />}
        {location.pathname !== "/" && location.pathname !== "/form"
          && <SearchBar />}
      </div> */
export default App;