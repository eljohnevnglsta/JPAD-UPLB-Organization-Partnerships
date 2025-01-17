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
                const postsWithPublisherData = response.data.map(post => ({
                    ...post,
                    publisherName: '',
                    publisherProfilePicture: ProfilePicture // Use default profile picture initially
                }));
                postsWithPublisherData.reverse(); // Show most recent posts first
                setPosts(postsWithPublisherData);

                // Fetch publisher details (name and profile picture) for each post
                postsWithPublisherData.forEach(post => {
                    axios.post('http://localhost:3001/account/get', { email: post.publisher })
                        .then((response) => {
                            const publisherData = response.data || {};
                            setPosts(prevPosts =>
                                prevPosts.map(p =>
                                    p.announcementId === post.announcementId
                                        ? {
                                            ...p,
                                            publisherName: publisherData.name || 'Unknown',
                                            publisherProfilePicture: publisherData.profilePicture || ProfilePicture
                                        }
                                        : p
                                )
                            );
                        })
                        .catch((error) => {
                            console.error('Error fetching publisher details:', error);
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
                            <img
                                className="profile-picture"
                                src={post.publisherProfilePicture}
                                alt="Profile picture"
                            />
                            <div className="post-meta">
                                <h2>{post.publisherName || 'Loading...'}</h2>
                                <div className="post-date">
                                    <img className="clock-icon" src={clockIcon} alt="Clock Icon" />
                                    {new Date(post.announcementDate).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-content">{post.description.substring(0, 200)}...</p>

                        {post.description && (
                            <button className="btn-view" onClick={() => openModal(post)}>
                                View More
                            </button>
                        )}

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
