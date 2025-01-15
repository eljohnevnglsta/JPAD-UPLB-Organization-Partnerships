import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from '../assets/YSES-logo.png';

function ViewMoreModal({ isOpen, onClose, postDetails }) {
    if (!isOpen) return null;

    return (
        <div className='tailwind-scope'>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={ProfilePicture} alt="Profile picture" />
                        <h2 className="text-xl font-semibold">{postDetails.title}</h2>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="p-4 flex">
                    {postDetails.cover && (
                        <div className="w-1/2 pr-4">
                            <img className="rounded-lg" src={postDetails.cover} alt="Post cover" />
                        </div>
                    )}

                    <div className="w-1/2">
                        <p className="mb-2">
                            <strong>Publisher:</strong> {postDetails.publisher}
                        </p>
                        <p className="mb-2">
                            <strong>Date:</strong> {new Date(postDetails.announcementDate).toLocaleString()}
                        </p>
                        <p className="text-gray-700">{postDetails.description}</p>
                    </div>
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
