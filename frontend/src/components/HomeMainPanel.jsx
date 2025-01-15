import Header from "./MainHeader";
import CardPost from "./HomeCardPost";
import ShowMoreButton from "./ShowMoreButton";


function HomeMainPanel(){

    return(
        <div className="main-panel">
            <Header />
            <CardPost />
            <ShowMoreButton/>
        </div>
    )
}

export default HomeMainPanel; 