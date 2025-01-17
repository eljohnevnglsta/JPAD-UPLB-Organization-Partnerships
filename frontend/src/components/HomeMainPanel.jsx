import Header from "./MainHeader";
import CardPost from "./HomeCardPost/HomeCardPost";
import ShowMoreButton from "./ShowMoreButton";


function HomeMainPanel(){

    return(
        <div className="main-panel-profile">
            <Header />
            <CardPost />
            <ShowMoreButton/>
        </div>
    )
}

export default HomeMainPanel; 