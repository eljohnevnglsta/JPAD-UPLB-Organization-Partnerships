import { use, useEffect, useState } from 'react';
import OrgPicture from '../assets/YSES-logo.png'; 
import axios from 'axios';

function TopOrganizations() {
    const [topOrganizations, setTopOrganizations] = useState([]);
    useEffect(() => {
        // Fetch top organizations
        axios.get('http://localhost:3001/account/get/all')
            .then((response) => {
                // Filter the organizations
                const organizations = response.data.filter((account) => account.role === 'organization');
                // Randomize 6 organizations from the array
                const randomOrganizations = response.data.sort(() => 0.5 - Math.random()).slice(0, 6);
                setTopOrganizations(randomOrganizations);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <div className="top-organizations">
            <h2>Top Organizations</h2>
            <div className="org-cards-container">
                {topOrganizations.map((org, index) => (
                    <div key={index} className="org-card">
                        <img className="org-picture" src={org.profilePicture} alt="Org picture" />
                        <p className="org-name">{org.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopOrganizations; 