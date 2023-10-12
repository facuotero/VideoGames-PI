import { useEffect, useState } from "react";
import axios from "axios";
import style from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/action";

const Form = () => {
  /* Controlar un Formulario
  Formulario y Estado tienen que tener en todo momento lo mismo escrito en cada una de sus propiedades. Formulario reflejo del estado.
  Para eso le ponemos el value a los input. Para que sean un reflejo del valor del estado.
  Para cambiar el input tengo que cambiar el estado.
  */
  const genres = useSelector((state) => state.genres); //generos del estado global
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

  //Estado para manejar las validaciones
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    released: "",
    rating: "",
    genres: [],
  });

  //cuando haga un cambio en mi estado, va a validar si lo que estoy escribiendo es correcto
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

    if (form.rating < 1 || form.rating > 5) {
      newErrors.rating = "Rating must be between 1-5";
    }

    if (form.name === "") newErrors.name = "";
    if (form.image === "") newErrors.image = "";
    if (form.rating === "") newErrors.rating = "";

    setErrors({ ...newErrors });
  };

  /*Tengo que leer lo que estoy escribiendo y guardarlo en la propiedad del estado que corresponda. El event me trae la info que 
  me interesa. Me dice dónde escribí y viene en su propiedad target. event.target.name(quien escribio) event.target.value(lo que
  escribio). Por eso le ponemos names a los inputs*/
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
        //[property] estamos diciendo que el nombre de la propiedad se determinara dinamicamente segun el valor de la variable property.
        //tecnica para actualizar las propiedades de un objeto JS de manera dinámica.
      });
    }
    validate({
      ...form,
      [property]: value, //demore lo mismo en validar que lo que se carga el estado para que vaya valiando a la par que se escribe
    });
  };

  // const disabledButton = () => {
  //   let disabledAux = true;
  //   for(let key in errors){
  //     if(errors[key] === ""){
  //       disabledAux = false;
  //     }else{
  //       disabledAux = true;
  //       break;
  //     }
  //   }
  //   return disabledAux;
  // }

  const removeGenre = (genre) => {//*para eliminar un genero*/
  let genresAux = form.genres.filter((g) => g !== genre);
  setForm({
    ...form,
    genres: genresAux,
});
};

  //El estado global redux no tiene participacion en la operación
  const submitHandler = (event) => {
    event.preventDefault(); //para evitar que se me haga un submit por defecto
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
          <button type="button" onClick={() => removeGenre(genreToRemove)}>X</button>
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
