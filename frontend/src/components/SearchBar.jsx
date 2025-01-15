import "../stylesheets/Search.css";
import SearchIcon from '../assets/magnifying-glass-solid.svg'; 

function SearchBar() {
    return (
        <div className="search-container">
            <div className="input-wrapper">
                <img src={SearchIcon} alt="Search Icon" className="search-icon-bar" />
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                />
            </div>
        </div>
    );
}

export default SearchBar;
