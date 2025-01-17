import { useState } from "react";
import "../stylesheets/Search.css";
import SearchIcon from "../assets/magnifying-glass-solid.svg";

function SearchBar() {
    const [query, setQuery] = useState("");
    const suggestions = [
        "Young Software Engineers' Society",
        "Young Blood",
        "Yomite Club",
        "Yoimiya Haters",
    ]; 

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
    );

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion); // Update query with the selected suggestion
    };

    return (
        <div className="search-container">
            <div className="input-wrapper">
                <img src={SearchIcon} alt="Search Icon" className="search-icon-bar" />
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {/* Show suggestions if query is not empty */}
            {query && filteredSuggestions.length > 0 && (
                <div className="suggestions-container">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)} // Handle suggestion click
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
