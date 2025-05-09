import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreatePost() {

    // Get account details from local storage
    const userDetails = JSON.parse(localStorage.getItem('account'));
    const userEmail = userDetails.email;

    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [eventLinked, setEventLinked] = useState('');
    const [error, setError] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/event/get/all')
            .then((response) => {
                const userEvents = response.data.filter((event) => event.publisher === userEmail);
                setEvents(userEvents);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [userEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !caption || !imageCover || !eventLinked) {
      setError('All fields are required.');
      return;
    }

    axios.post('http://localhost:3001/announcement/create', {
        publisher: userEmail,
        title,
        description: caption,
        eventId: eventLinked,
        cover: imageCover
    }).then((response) => {
        if (response.data.success !== true) {
            throw new Error(response.data.message);
        }
        alert('Post created successfully!');
        window.location.href = '/';
    }).catch((error) => {
        console.log(error.message);
        alert('An error occurred. Please try again.');
    });

    };

  return (
    <div className='tailwind-scope'>
      <div className="flex justify-center items-center min-h-screen bg-gray-300">
            <div className="bg-white p-8 rounded-t-3xl shadow-lg w-full max-w-xl text-center">
                <h2 className="text-2xl font-bold mb-4">Create Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="text-left">
                        <label htmlFor="title" className="block font-medium">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="caption" className="block font-medium">Caption</label>
                        <textarea 
                            id="caption" 
                            name="caption" 
                            rows="5" 
                            value={caption} 
                            onChange={(e) => setCaption(e.target.value)} 
                            required 
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>

                    <div className="text-left">
                        <label htmlFor="imagecover" className="block font-medium">Image Cover</label>
                        <input 
                            type="url" 
                            id="imagecover" 
                            name="imagecover" 
                            value={imageCover} 
                            onChange={(e) => setImageCover(e.target.value)} 
                            required 
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="eventlinked" className="block font-medium">Event Linked</label>
                        <select 
                            id="eventlinked" 
                            name="eventlinked" 
                            value={eventLinked} 
                            onChange={(e) => setEventLinked(e.target.value)} 
                            required 
                            className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="" disabled>Select event</option>
                            {events.map((event) => (
                                <option key={event.eventId} value={event.eventId}>{event.title}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">Post</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default CreatePost;
