import Notifications from "./Notifications";
import TopOrganizations from "./TopOrganizations";

function HomeSidePanel(){

    return(
        <div className="side-panel">
            <Notifications />
            <TopOrganizations/>
        </div>
    )
}

export default HomeSidePanel; 