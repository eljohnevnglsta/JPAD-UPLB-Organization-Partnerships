import React from 'react';
import styles from './ViewMoreModal.module.css';
import PropTypes from 'prop-types';
import ProfilePicture from '../../assets/YSES-logo.png';

function ViewMoreModal({ isOpen, onClose, postDetails }) {
    if (!isOpen) return null;

    const modalContentClass = postDetails.image ? styles.modalContentWithImage : "";

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={`${styles.modalContent} ${modalContentClass}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    {/* Render profile picture in place of orgLogo */}
                    <img className={styles.profilePictureModal} src={ProfilePicture} alt="Profile picture" />
                    <h2 className={styles.modalTitle}>{postDetails.title}</h2>

                    {/* Close Button inside the modal-header */}
                    <button className={styles.closeModal} onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {/* Left Column: Post Image */}
                    {postDetails.image && (
                        <div className={styles.modalImage}>
                            <img src={postDetails.image} alt="Post image" />
                        </div>
                    )}

                    {/* Right Column: Post Details */}
                    <div className={styles.modalDetails}>
                        <p className={styles.modalText}>{postDetails.subtitle}</p>

                        {/* Render content text */}
                        {postDetails.content && <p className={styles.modalTextContent}>{postDetails.content}</p>}
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
