import "./App.css";
import {Home,Landing,Detail,Form} from "./views/main";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, useLocation} from "react-router-dom";

function App() {

  const location = useLocation();


  return (
    <div>
      {location.pathname !== "/" && <NavBar/>} {/*Si no estamos en la landing renderiza la navBar*/}
       <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path ="/home" element={<Home/>} />
          <Route path ="/detail/:id" element={<Detail />}/>
          <Route path ="/create" element={<Form/>} />
       </Routes>

    </div>
  );
}

export default App;