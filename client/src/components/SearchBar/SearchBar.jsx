import { useState } from "react";
import { getGameByName } from "../../redux/action";
import { useDispatch } from "react-redux";

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
    <div>
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
