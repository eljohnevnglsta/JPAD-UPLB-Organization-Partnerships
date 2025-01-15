import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from '../assets/YSES-logo.png';  

function ViewMoreModal({ isOpen, onClose, postDetails }) {
    if (!isOpen) return null; 

    const modalContentClass = postDetails.image ? "modal-content-with-image" : "";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${modalContentClass}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    {/* Render profile picture in place of orgLogo */}
                    <img className="profile-picture-modal" src={ProfilePicture} alt="Profile picture" />
                    <h2 className="modal-title">{postDetails.title}</h2>

                    {/* Close Button inside the modal-header */}
                    <button className="close-modal" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="modal-body">
                    {/* Left Column: Post Image */}
                    {postDetails.image && (
                        <div className="modal-image">
                            <img src={postDetails.image} alt="Post image" />
                        </div>
                    )}

                    {/* Right Column: Post Details */}
                    <div className="modal-details">
                        <p className="modal-text">{postDetails.subtitle}</p>

                        {/* Render content text */}
                        {postDetails.content && <p className="modal-text-content">{postDetails.content}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

ViewMoreModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    postDetails: PropTypes.object.isRequired,
};

export default ViewMoreModal;
