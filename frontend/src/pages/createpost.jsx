import React, { useState } from 'react';
import "../stylesheets/createpost.css"

function CreatePost() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [imageCover, setImageCover] = useState('');
  const [eventLinked, setEventLinked] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !caption || !imageCover || !eventLinked) {
      setError('All fields are required.');
      return;
    }

    setError('');

    console.log('Title:', title);
    console.log('Caption:', caption);
    console.log('Image Cover:', imageCover);
    console.log('Event Linked:', eventLinked);

  };

  return (
    <div className="wrapper">
      <div className="create-post-container">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="caption">Caption</label>
          <textarea
            id="caption"
            name="caption"
            rows="5"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          ></textarea>

          <label htmlFor="imagecover">Image Cover</label>
          <input
            type="url"
            id="imagecover"
            name="imagecover"
            value={imageCover}
            onChange={(e) => setImageCover(e.target.value)}
            required
          />

          <label htmlFor="eventlinked">Event Linked</label>
          <select
            id="eventlinked"
            name="eventlinked"
            value={eventLinked}
            onChange={(e) => setEventLinked(e.target.value)}
            required
          >
            <option value="" disabled>Select event</option>
            <option value="event1">Event 1</option>
            <option value="event2">Event 2</option>
            <option value="event3">Event 3</option>
          </select>

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
