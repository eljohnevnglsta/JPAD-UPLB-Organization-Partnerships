import { useEffect, useState } from "react"
import axios from "axios"
import { set } from "mongoose"
import { useParams } from "react-router-dom"

function SidePanel() {

    const userEmail = JSON.parse(localStorage.getItem('account')).email
    const [events, setEvents] = useState([])
    const [partnerships, setPartnerships] = useState([])
    let {accountemail} = useParams()    

    useEffect(() => {
        axios.get('http://localhost:3001/event/get/all')
            .then((response) => {
                setEvents(response.data.filter((event) => event.publisher === accountemail)) 
                setPartnerships(response.data.filter((event) => event.partnerIds.includes(accountemail)))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return(
        <div className="sidepanel">
            <div className="current-events">
                <p className="current-events-header">Current Events</p>
                <ul className="current-events-container">
                    {events.map((event) => (
                        <li className="current-events-item" key={event.eventId}>{event.title}</li>
                    ))}
                </ul>
            </div>
            <div className="current-partnerships">
                <p className="current-partnerships-header">Current Partnerships</p>
                <ul className="current-partnerships-container">
                    {partnerships.map((event) => (
                        <li className="current-partnerships-item" key={event.eventId}>{`${event.title} by ${event.publisher}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SidePanel