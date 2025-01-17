import "../stylesheets/Home.css"
import NavigationBar from "../components/NavigationBar/NavigationBar";
import MainPanel from "../components/HomeMainPanel";
import SidePanel from "../components/HomeSidePanel";

function Home(){
    return (
        <>
          <div className="nav-bar">
            <NavigationBar/>
          </div>
          <div className="main-content">
            <MainPanel/>
            <SidePanel/>
        </div>
        </>
    );
    
}
export default Home; 