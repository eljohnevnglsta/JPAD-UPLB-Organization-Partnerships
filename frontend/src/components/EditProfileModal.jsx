import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProfileModal(props) {
    // to store the data 
    const [orgData, setOrgData] = useState([]);

    // initially load the data abt the org
    useEffect(() => {
      axios.post('http://localhost:3001/account/get', { email: 'exec@yses.org' })
        .then((response) => {
          // console.log(response.data); // testing
          setOrgData(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, []);

    // when an input is updated in the form
    const handleInputChange = (e) => {
      const {name, value} = e.target;
    
      // for the nested contactDetails
      if (name in orgData.contactDetails) {
        setOrgData((prevData) => ({
          ...prevData,
          contactDetails: {
            ...prevData.contactDetails,
            [name]: value,
          },
        }));
      } else {
        setOrgData((prevData) => ({ ...prevData, [name]: value }));
      }
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
        const response = await axios.post('http://localhost:3001/account/update', {
          name: orgData.name,
          email: 'exec@yses.org',
          password: orgData.password,
          bio: orgData.bio,
          // TODO: update profile picture
          contactDetails: {
            Facebook: orgData.contactDetails.Facebook,
            Instagram: orgData.contactDetails.Instagram,
            LinkedIn: orgData.contactDetails.LinkedIn,
          },
        });

        console.log('Profile updated:', response.data); // testing
    
        window.location.reload(); // reload the page if successful (so state data is refetched/updated)
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="edit-profile-header">Edit Profile</h2>

          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={orgData.name || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Bio:
              <textarea
                name="bio"
                value={orgData.bio || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Profile Picture:
              <input
                /* TODO: on upload, change profile picture */
                type="file"
                id="profile-picture-upload"
                accept="image/*"
              />
            </label>
            <label>
              Facebook:
              <input
                type='link'
                name="Facebook"
                placeholder="https://www.facebook.com/your-profile"
                value={orgData.contactDetails?.Facebook || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Instagram:
              <input
                type='link'
                name="Instagram"
                placeholder="https://www.instagram.com/your-profile"
                value={orgData.contactDetails?.Instagram || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              LinkedIn:
              <input
                type='link'
                name="LinkedIn"
                placeholder="https://www.linkedin.com/your-profile"
                value={orgData.contactDetails?.LinkedIn || ''}
                onChange={handleInputChange}
              />
            </label>
            <div className="modal-buttons">
              <button className="btn-close" type="button" onClick={handleClose}>
                Close
              </button>
              <button className="btn-submit" type="submit">
                Save Profile
              </button>
            </div>
          </form>

        </div>
      </div>
    );
}

export default EditProfileModal;
