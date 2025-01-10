import mailIcon from '../assets/mail-icon.png'; 
import linkIcon from '../assets/link-icon.png';

function About() {

    return(
        <div className="about-org">
            <h1 className="org-name">Young Software Engineers' Society</h1>
            <h2 className="org-bio">Bridging the gap between the academe and the industry.</h2>
            <ul className="org-links-container">
                <img src={mailIcon} className="links-icon"/><li className="org-links">Email</li>
                <img src={linkIcon} className="links-icon"/><li className="org-links">Facebook</li>
                <img src={linkIcon} className="links-icon"/><li className="org-links">Instagram</li>
                <img src={linkIcon} className="links-icon"/><li className="org-links">LinkedIn</li>
            </ul>
        </div>
    );
}

export default About