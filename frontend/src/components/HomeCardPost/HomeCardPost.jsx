import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePicture from '../../assets/default-profile-picture.jpg';
import clockIcon from '../../assets/clock-solid.svg'; 
import ViewMoreModal from '../ViewMoreModal'; 

function HomeCardPost() {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    // Fetch announcements from the backend
    useEffect(() => {
        axios.get('http://localhost:3001/announcement/get/all')
            .then((response) => {
                const postsWithPublisherName = response.data.map(post => ({
                    ...post,
                    publisherName: ''
                }));
                setPosts(postsWithPublisherName);
                // Fetch publisher names for each post
                postsWithPublisherName.forEach(post => {
                    axios.post('http://localhost:3001/account/get', { email: post.publisher })
                        .then((response) => {
                            const publisherName = response.data ? response.data.name : 'Unknown';
                            setPosts(prevPosts => 
                                prevPosts.map(p => 
                                    p.announcementId === post.announcementId ? { ...p, publisherName } : p
                                )
                            );
                        })
                        .catch((error) => {
                            console.error('Error fetching publisher name:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Error fetching announcements:', error);
            });
    }, []);

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    };

    return (
        <div className="post-cards">
            <h2>Recent Announcements</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div className="post-card" key={post.announcementId}>
                        <div className="post-header">
                            <img className="profile-picture" src={ProfilePicture} alt="Profile picture" />
                            <div className="post-meta">
                                <h2>{post.publisherName || 'Loading...'}</h2> {/* Show 'Loading...' while fetching name */}
                                <div className="post-date">
                                    <img className="clock-icon" src={clockIcon} alt="Clock Icon" />
                                    {new Date(post.announcementDate).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-content">{post.description.substring(0, 200)}...</p>

                        {/* Show "View More" button only if description exists */}
                        {post.description && (
                            <button className="btn-view" onClick={() => openModal(post)}>
                                View More
                            </button>
                        )}

                        {/* Display cover image if available */}
                        {post.cover && (
                            <div className="post-image">
                                <img src={post.cover} alt="Post visual" />
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No announcements available.</p>
            )}

            {/* View More Modal */}
            {selectedPost && (
                <ViewMoreModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    postDetails={selectedPost}
                    accountName={selectedPost.publisherName}
                />
            )}
        </div>
    );
}

export default HomeCardPost;