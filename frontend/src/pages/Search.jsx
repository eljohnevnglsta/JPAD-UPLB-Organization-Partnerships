import "../stylesheets/Search.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import SearchBar from "../components/SearchBar";

function Search() {

    return (
        <>
            <div className="search-page-nav-bar">
                <NavigationBar />
            </div>
            <div className="search-page-content">
                <SearchBar />
            </div>
        </>
    );
    
}
export default Search;
