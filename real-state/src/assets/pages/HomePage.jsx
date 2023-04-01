import Feature from "../components/Dashboard/Features";
import Hero from "../components/Dashboard/Hero";
import Feat from "../components/Dashboard/Features";
import NavBar from "../components/Dashboard/Navbar";
import AddProp from "../components/Dashboard/AddProp";


const HomePage = () =>{
    return(
        <div>
            <Hero/>
            <Feature/>
            <AddProp/>
        </div>

    )
}

export default HomePage;