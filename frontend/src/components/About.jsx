import mailIcon from '../assets/mail-icon.png'; 
import linkIcon from '../assets/link-icon.png';

function About() {

    return(
        <div className="about-org">
            <h1 className="org-name1">Young Software Engineers' Society</h1>
            <h2 className="org-bio">Bridging the gap between the academe and the industry.</h2>
            <ul className="org-links-container">
                <li className="org-links">
                     <img src={mailIcon} className="links-icon"/> 
                     Email
                </li>
                <li className="org-links">
                    <img src={linkIcon} className="links-icon"/>
                    Facebook
                </li>
                <li className="org-links">
                    <img src={linkIcon} className="links-icon"/>
                    Instagram
                </li>
                <li className="org-links">
                    <img src={linkIcon} className="links-icon"/>
                    LinkedIn
                </li>
            </ul>
        </div>
    );
}

export default About