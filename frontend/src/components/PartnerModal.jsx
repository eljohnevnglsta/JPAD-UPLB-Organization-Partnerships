import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PartnerModal(props) {
    // to store the data
    const [requestData, setRequestData] = useState([]);
    const userAccount = JSON.parse(localStorage.getItem('account'));
    const [events, setEvents] = useState([]);   

    // when an input is updated in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequestData((prevData) => ({
        ...prevData,
        [name]: value, 
        }));
    };

    // closes the modal when close button is clicked
    const handleClose = (e) => {
        e.preventDefault();
        props.onClose(); // close the modal
    };

    let {accountemail} = useParams();

    // closes the modal & submits the information when submit button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/request/create", {
                eventId: requestData.title,
                partnershipType: requestData.partnershipType,
                message: requestData.body,
                publisher: userAccount.email,
                invitee: accountemail,
                attachments: ["https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"],
            });
  
            console.log('Request created:', response.data); // testing
      
            props.onClose(); // close the modal
        } catch (error) {
            console.error('Error creating partnership request:', error.response ? error.response.data : error.message);
        }        
    };

    useEffect(() => {
        axios.get('http://localhost:3001/event/get/all')
            .then((response) => {
                setEvents(response.data.filter((event) => event.publisher === userAccount.email));
            })
            .catch((error) => {
                console.log(error.message);
            });
    });

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="partnership-request-header">Partnership Request</h2>
                <form className="partnership-form" onSubmit={handleSubmit}>
                    <div className='tailwind-scope'>
                    <label className="partnership-form-title">
                            Event:
                            <select
                                name="title"
                                value={requestData.title || ''} // Fallback to an empty string if undefined
                                onChange={handleInputChange}
                                title="Please select an event"
                                required
                                className='rounded-xl border border-black bg-gray-300 p-2'   
                            >
                                <option value="" disabled>Select an event</option>
                                {events.map((event) => (
                                    <option key={event.eventId} value={event.eventId}>{event.title}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <label className="partnership-form-body">
                        Body:
                        <textarea
                        name="body"
                        value={requestData.body}
                        onChange={handleInputChange}
                        title="Please enter body content"
                        required
                        />
                    </label>
                    <label className="partnership-form-type">
                        Partnership Type:
                        <input
                        type="text"
                        name="partnershipType"
                        value={requestData.partnershipType}
                        onChange={handleInputChange}
                        placeholder="Looking for sponsors, media partners, manpower, etc."
                        />
                    </label>
                    {/* TODO: file upload */}
                    <label className="partnership-form-upload">
                        Attachment:
                        <input type="file" id="file-upload" />
                    </label>
                    <div className="modal-buttons">
                        <button className="btn-close" type="button" onClick={handleClose}>Close</button> 
                        <button className="btn-submit" type="submit" >Send Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PartnerModal;
