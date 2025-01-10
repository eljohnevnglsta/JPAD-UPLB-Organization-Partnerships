
function EditProfileModal(props) {
    const handleClose = (e) => {
        e.preventDefault(); // prevent form submission when closing
        props.onClose(); // close the modal
    };

    const handleSubtmit = (e) => {
        // handle the submitting 

        props.onClose(); 
    }

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="edit-profile-header">Edit Profile</h2>
          <form className="edit-profile-form">
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Bio:
              <textarea name="bio" />
            </label>
            <label>
                Profile Picture:
                <input type="file" id="profile-picture-upload"  accept="image/*" />
            </label>
            <label>
                Facebook:
                <input type="url" name="facebook-link" placeholder="https://www.facebook.com/your-profile"/>
            </label>
            <label>
                Instagram:
                <input type="url" name="instagram-link" placeholder="https://www.instagram.com/your-profile"/>
            </label>
            <label>
                LinkedIn:
                <input type="url" name="linkedin-link" placeholder="https://www.linkedin.com/your-profile"/>
            </label>
          </form>
            <button className="btn-close" type="button" onClick={handleClose}>Close</button> 
            <button className="btn-submit" type="submit" onClick={handleSubtmit}>Save Profile</button>
        </div>
      </div>
    );
}

export default EditProfileModal;
