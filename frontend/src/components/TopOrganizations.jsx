import OrgPicture from '../assets/YSES-logo.png'; 

function TopOrganizations() {

  return (
    <div className="top-organizations">
        <h2>Top Organizations</h2>
        <div className="org-cards-container">

            {/* Organization Card 1 */}
            <div className="org-card">
                <img className="org-picture" src={OrgPicture} alt="Org picture" />
                <p className="org-name">Young Software Engineers' Society</p>
            </div>
            
            {/* Organization Card 2 */}
            <div className="org-card">
                <img className="org-picture" src={OrgPicture} alt="Org picture" />
                <p className="org-name">Young Software Engineers' Society</p>
            </div>
            
            {/* Organization Card 3 */}
            <div className="org-card">
                <img className="org-picture" src={OrgPicture} alt="Org picture" />
                <p className="org-name">Young Software Engineers' Society</p>
            </div>

            {/* Organization Card 4 */}
            <div className="org-card">
                <img className="org-picture" src={OrgPicture} alt="Org picture" />
                <p className="org-name">Young Software Engineers' Society</p>
            </div>
            
            {/* Organization Card 5 */}
            <div className="org-card">
                <img className="org-picture" src={OrgPicture} alt="Org picture" />
                <p className="org-name">Young Software Engineers' Society</p>
            </div>
            
            {/* Organization Card 6 */}
            <div className="org-card">
                <img className="org-picture" src={OrgPicture} alt="Org picture" />
                <p className="org-name">Young Software Engineers' Society</p>
            </div>

        </div>
    </div>
    );
}

export default TopOrganizations; 