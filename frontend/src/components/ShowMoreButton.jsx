
import ShowMoreIcon from '../assets/list-solid.svg';
import PreviousIcon from '../assets/arrow-left-solid.svg';

function ShowMoreButton({ onPreviousClick, onShowMoreClick, showPrevious }) {
    return (
        <div className="show-more-buttons">
            {showPrevious && (
                <button className="previous-btn" onClick={onPreviousClick}>
                    <img className="previous-icon" src={PreviousIcon} alt="Previous Icon" />
                    Previous
                </button>
            )}
            <button className="show-more-btn" onClick={onShowMoreClick}>
                <img className="show-more-icon" src={ShowMoreIcon} alt="Show More Icon" />
                Show More
            </button>
        </div>
    );
}

export default ShowMoreButton;

