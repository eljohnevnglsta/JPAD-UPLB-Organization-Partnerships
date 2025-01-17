import { use, useEffect, useState } from 'react';
import OrgPicture from '../assets/YSES-logo.png'; 
import axios from 'axios';

function TopOrganizations() {
    const [topOrganizations, setTopOrganizations] = useState([]);
    const userAccount = JSON.parse(localStorage.getItem('account'));
    useEffect(() => {
        // Fetch top organizations
        axios.get('http://localhost:3001/account/get/all')
            .then((response) => {
                // Filter the organizations
                const organizations = response.data.filter((account) => account.role === 'organization' && account.email !== userAccount.email);
                if (organizations.length <= 6) {
                    setTopOrganizations(organizations);
                    return;
                }
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
                    <div key={index} className="org-card" style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/profile/${org.email}`}>
                        <img className="org-picture" src={org.profilePicture} alt="Org picture" />
                        <p className="org-name">{org.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopOrganizations; 