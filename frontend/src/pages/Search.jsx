import "../stylesheets/Search.css"
import NavigationBar from "../components/NavigationBar/NavigationBar";
import SearchBar from "../components/SearchBar";

function Search() {

    return (
        <div className="search-page">
            <div className="search-page-header">
                <NavigationBar />
            </div>
            <div className="search-page-main">
                <SearchBar />
            </div>
        </div>
    );
    
}

export default Search;
