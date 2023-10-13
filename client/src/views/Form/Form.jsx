import { useEffect, useState } from "react";
import axios from "axios";
import style from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/action";

const Form = () => {

  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "*",
    platforms: "*",
    image: "",
    released: "*",
    rating: "",
    genres: [],
  });

  const validate = (form) => {
    const hasSymbols = /[^a-zA-Z0-9\s]+/;
    const urlValidation = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    
    const newErrors = {};

    if (hasSymbols.test(form.name)) {
      newErrors.name = "Name cannot contain symbols";
    }

    if (!urlValidation.test(form.image)) {
      newErrors.image = "Invalid URL";
    }

    if (form.rating < 1 || form.rating > 10) {
      newErrors.rating = "Rating must be between 1-10";
    }
    if (hasSymbols.test(form.rating)) {
      newErrors.rating = "Rating must be a number";
    }

    if (form.name === "") newErrors.name = "";
    if (form.image === "") newErrors.image = "";
    if (form.rating === "") newErrors.rating = "";
    

    setErrors({ ...newErrors });
  };


  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "genres") {
      const genreValue = event.target.value;
      if (!form.genres.includes(genreValue)) {
        setForm({
          ...form,
          genres: [...form.genres, genreValue],
        });
      }
    } else {
      setForm({
        ...form,
        [property]: value,
   
      });
    }
    validate({
      ...form,
      [property]: value, 
    });
  };

  const removeGenre = (genre) => {
  let genresAux = form.genres.filter((g) => g !== genre);
  setForm({
    ...form,
    genres: genresAux,
});
};

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/videogames", form)
      .then((res) => {
        console.log(res.data);
        alert("Creado correctamente");
      })
      .catch(() => alert("Error al crear el videojuego"));
  };

  return (
    <form onSubmit={submitHandler} className={style.form}>
      <h1>Create your own Videogame!</h1>
      <img src="./src/assets/pngegg (1).png" alt="controll" className={style.controll}/>

      <label className={style.label}>Name:</label>
      <input
        type="text"
        value={form.name}
        onChange={changeHandler}
        name="name"
      ></input>
      {errors.name && <span className={style.error}>{errors.name}</span>}

      <label className={style.label}>Image:</label>
      <input
        type="text"
        value={form.image}
        onChange={changeHandler}
        name="image"
        placeholder="Image URL"
      ></input>
      {errors.image && <span className={style.error}>{errors.image}</span>}

      <label className={style.label}>Platforms:</label>
      <input
        type="text"
        value={form.platforms}
        onChange={changeHandler}
        name="platforms"
      ></input>

      <label className={style.label}>Released:</label>
      <input
        type="date"
        value={form.released}
        onChange={changeHandler}
        name="released"
      ></input>

      <label className={style.label}>Rating:</label>
      <input
        className={style.input}
        type="text"
        value={form.rating}
        onChange={changeHandler}
        name="rating"
      ></input>
      {errors.rating && <span className={style.error}>{errors.rating}</span>}

      <label className={style.label}>Genres:</label>
      <select
        className={style.select}
        value=""
        onChange={changeHandler}
        name="genres"
      >
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name} className={style.options}>
            {genre} 
          </option>
        ))}
      </select>
      {form.genres && <span>{form.genres.map((genreToRemove) =>(
        <span key={genreToRemove} className={style.genres}>
          {genreToRemove}
          <button type="button" onClick={() => removeGenre(genreToRemove)} className={style.deleteButton}>X</button>
        </span>
      )
      )}</span>}

      <label className={style.label}>Description:</label>
      <textarea
        className={style.input}
        rows="9"
        cols="45"
        value={form.description}
        onChange={changeHandler}
        name="description"
      ></textarea>

      <button type="submit" className={style.create} disabled={Object.values(errors).some((error) => error)}>
        Create
      </button>
    </form>
  );
};

export default Form;

//TIPEO..
//SE DISPARA HANDLER...
//PIDE EL CAMBIO DEL ESTADO
//SE HACE LA VALIDACION
//EL ESTADO CAMBIA
