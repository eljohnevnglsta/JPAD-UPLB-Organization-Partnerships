
function SidePanel() {

    return(
        <div className="sidepanel">
            <div className="current-events">
                <p className="current-events-header">Current Events</p>
                <ul className="current-events-container">
                    <li className="current-events-item">Junior Hackathon</li>
                    <li className="current-events-item">Practicum Fair</li>
                </ul>
            </div>
            <div className="current-partnerships">
                <p className="current-partnerships-header">Current Partnerships</p>
                <ul className="current-partnerships-container">
                    <li className="current-partnerships-item">UPLB Sample Event</li>
                    <li className="current-partnerships-item">UPLB Sample Event</li>
                    <li className="current-partnerships-item">UPLB Sample Event</li>
                </ul>
            </div>
        </div>
    )
}

export default SidePanel