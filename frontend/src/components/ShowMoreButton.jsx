
import ShowMoreIcon from '../assets/list-solid.svg'; 

function ShowMoreButton() {
    return (
        <button className="show-more-btn">
            <img className="show-more-icon" src={ShowMoreIcon} alt="Show More Icon" />
            Show More
            {/* TO DO: add link to the destination page when clicked */}
        </button>
    );
}

export default ShowMoreButton;

