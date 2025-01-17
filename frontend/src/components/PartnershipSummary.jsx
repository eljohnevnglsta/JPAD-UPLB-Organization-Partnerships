import { useEffect, useState } from "react";
import axios from "axios";

export default function PartnershipSummary(props) {
    const userEmail = JSON.parse(localStorage.getItem('account')).email;
    const [event, setEvent] = useState({});
    const [publisher, setPublisher] = useState({});
    const [invitee, setInvitee] = useState({});

    useEffect(() => {
        axios.post('http://localhost:3001/event/get/id', {
            eventId: props.partnership.eventId
        }).then((response) => {
            if (response.data === null) {
                setEvent({ title: "Event not found" });
                return;
            }
            setEvent(response.data);
        }).catch((error) => {
            console.log(error.message);
        });

        axios.post('http://localhost:3001/account/get', {
            email: props.partnership.publisher
        }).then((response) => {
            if (response.data === null) {
                setPublisher({ name: "Publisher not found", profilePicture: "" });
                return;
            }
            setPublisher(response.data);
        }).catch((error) => {
            console.log(error.message);
        });

        axios.post('http://localhost:3001/account/get', {
            email: props.partnership.invitee
        }).then((response) => {
            if (response.data === null) {
                setPublisher({ name: "Invitee not found", profilePicture: "" });
                return;
            }
            setInvitee(response.data);
        }).catch((error) => {
            console.log(error.message);
        });
    }, []);

    return (
        <div className="flex flex-row justify-between items-center p-5 border-b border-gray-300 bg-white shadow-sm rounded-lg space-x-10" style={{ width: '400px' }}>
            <div className="flex items-center">
                <img className="w-16 h-16 rounded-full object-cover mr-4"
                    src={userEmail === props.partnership.publisher ? invitee.profilePicture : publisher.profilePicture} alt="Publisher" />
                <div className="flex flex-col">
                    <div className="text-lg font-semibold text-gray-800">
                        {userEmail === props.partnership.publisher ? invitee.name : publisher.name}
                    </div>
                    <div className="text-sm text-gray-600">{event.title}</div>
                    <div className="text-sm text-gray-500">{props.partnership.partnershipType}</div>
                </div>
            </div>
            <div className="text-sm text-gray-500">
                {props.partnership.status}
            </div>
        </div>
    );
}