import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SidePanel( {publisher} ) {

    const [events, setEvents] = useState([]);

    // fetch events by publisher
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.post('http://localhost:3001/event/get/all/publisher', {
                    publisher, // pass the publisher value here
                });
                if (response.data.success) {
                    // console.log(response.data.value);
                    setEvents(response.data.value);
                } else {
                    console.error('Failed to fetch events:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching events:', error.message);
            }
        };

        fetchEvents();
    }, [publisher]); // refetch if publisher changes

    return(
        <div className="sidepanel">
            <div className="current-events">
                <p className="current-events-header">Current Events</p>
                <ul className="current-events-container"> {/* render events if available */}
                    {events.length > 0 ? (
                        events.map((event) => (
                            <li key={event._id} className="current-events-item">
                                {event.title} - {new Date(event.startDate).toLocaleDateString()}
                            </li>
                        ))
                    ) : (
                        <li className="current-events-item">No current events available</li>
                    )}
                </ul>
            </div>
            <div className="current-partnerships">
                <p className="current-partnerships-header">Current Partnerships</p>
                <ul className="current-partnerships-container">
                    <li className="current-partnerships-item">Sample Partner Event</li>
                    <li className="current-partnerships-item">Sample Partner Event</li>
                    <li className="current-partnerships-item">Sample Partner Event</li>
                </ul>
            </div>
        </div>
    )
}

export default SidePanel