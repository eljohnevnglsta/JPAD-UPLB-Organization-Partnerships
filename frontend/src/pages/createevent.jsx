import axios from 'axios';
import React, { useState } from 'react';

function CreateEvent() {

    // Get account details from local storage
    const userDetails = JSON.parse(localStorage.getItem('account'));
    const userEmail = userDetails.email;

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
        axios.post('http://localhost:3001/event/create', {
            publisher: userEmail, // TODO: Replace with actual publisher
            title: formData.title,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            otherDetails: formData.details,
            cover: formData.imageCover,
            eventType: formData.eventType,
        }).then((response) => {
            if (response.data.success !== true) {
                throw new Error(response.data.message);
            }
            alert("Event created successfully!");
        }).catch((error) => {
            console.log(error.message);
            alert("An error occurred. Please try again.");
        });
    };

    return (
        <div className='tailwind-scope'>
            <div className="flex justify-center items-center min-h-screen bg-gray-300">
            <div className="bg-white p-8 rounded-t-3xl shadow-lg w-full max-w-xl text-center">
                <h2 className="text-2xl font-bold mb-4">Create Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-left">
                        <label htmlFor="title" className="block font-medium">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="description" className="block font-medium">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows="5" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>

                    <div className="text-left">
                        <label htmlFor="startdate" className="block font-medium">Start Date</label>
                        <input 
                            type="date" 
                            id="startdate" 
                            name="startDate" 
                            value={formData.startDate} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="enddate" className="block font-medium">End Date</label>
                        <input 
                            type="date" 
                            id="enddate" 
                            name="endDate" 
                            value={formData.endDate} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="details" className="block font-medium">Other Details</label>
                        <textarea 
                            id="details" 
                            name="details" 
                            rows="5" 
                            value={formData.details} 
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>

                    <div className="text-left">
                        <label htmlFor="imagecover" className="block font-medium">Image Cover</label>
                        <input 
                            type="url" 
                            id="imagecover" 
                            name="imageCover" 
                            value={formData.imageCover} 
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="eventtype" className="block font-medium">Event Type</label>
                        <select 
                            id="eventtype" 
                            name="eventType" 
                            value={formData.eventType} 
                            onChange={handleChange} 
                            required
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="" disabled>Select event type</option>
                            <option value="Fund-raising">Fund-raising</option>
                            <option value="Flagship">Flagship</option>
                            <option value="Community">Community</option>
                            <option value="Contest">Contest</option>
                            <option value="Education">Education</option>
                            <option value="Health">Health</option>
                            <option value="Environment">Environment</option>
                            <option value="Technology">Technology</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">Create Event</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default CreateEvent;
