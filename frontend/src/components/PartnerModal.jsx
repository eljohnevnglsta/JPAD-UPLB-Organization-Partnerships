import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PartnerModal(props) {
    // to store the data
    const [requestData, setRequestData] = useState([]);

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

    // closes the modal & submits the information when submit button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/request/create", {
                eventId: requestData.title,
                partnershipType: requestData.partnershipType,
                message: requestData.body,
                // TODO
                publisher: "sample1@email.com",
                invitee: "sample2@email.com",
                attachments: null,
            });
  
            console.log('Request created:', response.data); // testing
      
            props.onClose(); // close the modal
        } catch (error) {
            console.error('Error creating partnership request:', error.response ? error.response.data : error.message);
        }        
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="partnership-request-header">Partnership Request</h2>
                <form className="partnership-form" onSubmit={handleSubmit}>
                    <label className="partnership-form-title">
                        Title:
                        <input
                        type="text"
                        name="title"
                        value={requestData.title}
                        onChange={handleInputChange}
                        title="Please enter a title"
                        required
                        />
                    </label>
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
