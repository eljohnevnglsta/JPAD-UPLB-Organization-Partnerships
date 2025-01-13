// export const Request = mongoose.model('Request', {
//     requestId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     publisher: {
//         type: String, // Email of the publisher
//         required: true
//     },
//     invitee: {
//         type: String, // Email of the invitee 
//         required: true
//     },
//     eventId: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ["pending", "approved", "rejected", "completed", "cancelled"],
//         default: "pending"
//     },
//     partnershipType: {
//         type: String, // Ex. Looking for sponsors, media partners, manpower and etc.
//         required: true
//     },
//     attachments: {
//         type: [String], // URL of the attachments (downloadable)
//         default: []
//     }, message: {
//         type: String,
//         required: true,
//     },
//     response: {
//         type: String,
//         default: ""
//     }
// });

import { useEffect, useState } from "react";
import axios from "axios";


export default function PartnershipSummary(props) {
    const [event, setEvent] = useState({});
    const [publisher, setPublisher] = useState({});

    useEffect(() => {
        axios.post('http://localhost:3001/event/get/id', {
            eventId: props.partnership.eventId
        }).then((response) => {
            console.log(response.data);
            setEvent(response.data);
        }).catch((error) => {
            console.log(error.message);
        });

        axios.post('http://localhost:3001/account/get', {
            email: props.partnership.publisher
        }).then((response) => {
            console.log(response.data);
            setPublisher(response.data);
        }).catch((error) => {
            console.log(error.message);
        });
    }, []);

    return (
        <div className="flex flex-row justify-between items-center p-5 border-b border-gray-300 bg-white shadow-sm rounded-lg">
            <div className="flex items-center">
                <img className="w-16 h-16 rounded-full object-cover mr-4"
                    src={publisher.profilePicture} alt="Publisher" />
                <div className="flex flex-col">
                    <div className="text-lg font-semibold text-gray-800">{publisher.name}</div>
                    <div className="text-sm text-gray-600">{event.title}</div>
                    <div className="text-sm text-gray-500">{props.partnership.partnershipType}</div>
                </div>
            </div>
            <div className="text-sm text-gray-500">
                {new Date(props.partnership.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
}