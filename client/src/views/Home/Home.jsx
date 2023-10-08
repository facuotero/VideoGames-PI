import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllGames } from "../../redux/action";

const Home = () => {

//cuando se monta, que haga el dispatch
const dispatch = useDispatch();

useEffect(() => {
dispatch(getAllGames())
},[dispatch])

  return (
        <>
          <h1>Esta es la vista de Home</h1>
          <CardsContainer/>
        </>
    )
}

export default Home;