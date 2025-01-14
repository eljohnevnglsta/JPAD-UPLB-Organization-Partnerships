
import React from 'react';
import { Link } from 'react-router-dom';

function Notifications() {
    
    return (
        <div className="notifications-box">
            <h2>Notifications</h2>
            
            <div className="notifications">

                {/* Notification Cards */}
                <div className="notification-card">
                    <div className="number-box-1">5</div>
                    <div className="description">
                        <span className="highlight new">new</span> partnerships from other organizations
                    </div>
                </div>
                
                <div className="notification-card">
                    <div className="number-box-2">4</div>
                    <div className="description">
                        <span className="highlight rejected">rejected</span> partnerships
                    </div>
                </div>
                
                <div className="notification-card">
                    <div className="number-box-3">2</div>
                    <div className="description">
                        <span className="highlight accepted">accepted</span> partnerships
                    </div>
                </div>
            </div>
                
            {/* Partnerships Link */}
                
            <div className="partnerships">
                <div className="btn-partnerships"> View in Partnerships Tab</div>
            </div>
        </div>
    );
}

export default Notifications;