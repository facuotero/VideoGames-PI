import { useState } from "react";
import { getGameByName } from "../../redux/action";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [searchByName, setSearchByName] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearchByName(e.target.value);
    console.log(searchByName)
  };

  const handleSearch = () => {
    dispatch(getGameByName(searchByName));
  };

  return (
    <div className={style.searchBar}
    >
      <input
        type="search"
        placeholder="Search by Name"
        onChange={handleChange}
        value={searchByName}
      />
      <button onClick={handleSearch}>🔎</button>
    </div>
  );
};

export default SearchBar;
