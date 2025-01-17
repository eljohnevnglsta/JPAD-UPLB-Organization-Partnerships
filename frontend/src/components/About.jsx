import React, { useState, useEffect } from 'react';
import '../stylesheets/Profile.css'
import axios from 'axios';
import mailIcon from '../assets/mail-icon.png';
import linkIcon from '../assets/link-icon.png';
import phoneIcon from '../assets/phone-icon.png'
import profilePicture from '../assets/default-profile-picture.jpg'; 
import { useParams } from 'react-router-dom';

function About() {
    let { accountemail } = useParams();
    // to store the data 
    const [orgData, setOrgData] = useState([]);

    // request for the data abt the org
    useEffect(() => {
        axios.post('http://localhost:3001/account/get', {email: accountemail})
        .then((response) => {
            setOrgData(response.data);  
        })
        .catch((error) => {
            console.log(error.message);
        });
    }, []); 

    return (
        <div className='profile-about'>
            {/* profile pic */}
            <div className='profile-picture-container'>
                <img className="profile-picture-profile-page" src={orgData.profilePicture || profilePicture} alt="Profile picture" />
            </div>

            {/* about the org */}
            <div className="about-org">
                <h1 className="org-name-profile-page">{orgData.name}</h1>  
                <h2 className="org-bio-profile-page">{orgData.bio}</h2>

                <div className="org-links-container">
                    {/* email */}
                    {orgData.email && (
                    <div className="org-email" href={`mailto:${orgData.email}`}>
                        <img src={mailIcon} className="links-icon" alt="Mail" />
                        <span> {orgData.email} </span>
                    </div>
                    )}

                    {/* contact details  */}
                    {orgData.contactDetails && (
                    <ul className='org-contact-deets'>
                        {Object.entries(orgData.contactDetails)
                        .filter(([platform, url]) => { // check if value exists/is not empty/not the number
                            if (platform === 'Number') return false;
                            if (Array.isArray(url)) { // for other links
                                return url.length > 0;
                            }
                            return url; 
                        })
                        .map(([platform, url]) => (
                            <li className="org-links" key={platform}>
                                <img src={linkIcon} className="links-icon" alt="Link" />
                                <a href={ url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`} // add the https if the link doesn't start with it
                                target="_blank" rel="noopener noreferrer">
                                    {platform}
                                </a>
                            </li>
                        ))}
                    </ul>
                    )}

                    {/* render number separately */}
                    {orgData.contactDetails?.Number && (
                        <div className="org-number">
                            <img src={phoneIcon} className="links-icon" alt="Phone" />
                            <span> {orgData.contactDetails.Number} </span>
                        </div>
                    )}

                </div> {/* end of org-links */}        
            </div> {/* end of about-org */}
        </div>
        
    );
}

export default About;
