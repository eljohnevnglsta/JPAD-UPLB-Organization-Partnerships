import { useState, useEffect } from "react";
import "../stylesheets/Search.css";
import SearchIcon from "../assets/magnifying-glass-solid.svg";
import axios from "axios";

function SearchBar() {
    const user = JSON.parse(localStorage.getItem("account"));
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/account/get/all").then((response) => {
            const accounts = response.data;
            setAccounts(accounts);
            const accountNames = accounts.map(account => account.name);
            // Remove the current user's name from the suggestions
            const index = accountNames.indexOf(user.name);
            if (index > -1) accountNames.splice(index, 1);
            setSuggestions(accountNames);
        }).catch((error) => {
            console.log(error.message);
        });
    }, []);

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
    );

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion); // Update query with the selected suggestion
        const selectedAccount = accounts.find(account => account.name === suggestion); // Find the account object
        if (selectedAccount) {
            window.location.href = `/profile/${selectedAccount.email}`; // Redirect to the selected profile
        }
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
