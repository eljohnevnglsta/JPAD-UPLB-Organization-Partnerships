import React, { useState } from 'react';
import "../stylesheets/createevent.css";

function CreateEvent() {
    // State for each form field
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        details: '',
        imageCover: '',
        eventType: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation (you can add more checks here)
        if (!formData.title || !formData.description || !formData.startDate || !formData.endDate || !formData.eventType) {
            alert("Please fill out all required fields.");
            return;
        }

        // You can send formData to an API or log it for now
        console.log("Event created:", formData);

        // Reset form after submission (optional)
        setFormData({
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            details: '',
            imageCover: '',
            eventType: '',
        });
    };

    return (
        <div className="wrapper">
            <div className="create-event-container">
                <h2>Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        rows="5" 
                        value={formData.description} 
                        onChange={handleChange} 
                        required
                    ></textarea>

                    <label htmlFor="startdate">Start Date</label>
                    <input 
                        type="date" 
                        id="startdate" 
                        name="startDate" 
                        value={formData.startDate} 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="enddate">End Date</label>
                    <input 
                        type="date" 
                        id="enddate" 
                        name="endDate" 
                        value={formData.endDate} 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="details">Other Details</label>
                    <textarea 
                        id="details" 
                        name="details" 
                        rows="5" 
                        value={formData.details} 
                        onChange={handleChange}
                    ></textarea>

                    <label htmlFor="imagecover">Image Cover</label>
                    <input 
                        type="url" 
                        id="imagecover" 
                        name="imageCover" 
                        value={formData.imageCover} 
                        onChange={handleChange}
                    />

                    <label htmlFor="eventtype">Event Type</label>
                    <select 
                        id="eventtype" 
                        name="eventType" 
                        value={formData.eventType} 
                        onChange={handleChange} 
                    required
                    >
                        <option value="" disabled>Select event type</option>
                        <option value="event1">Fundraising</option>
                        <option value="event2">Education</option>
                        <option value="event3">Contest</option>
                    </select>


                    <button type="submit">Create Event</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;
