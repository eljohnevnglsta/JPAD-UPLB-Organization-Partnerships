import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePicture from '../../assets/default-profile-picture.jpg';
import clockIcon from '../../assets/clock-solid.svg';
import ViewMoreModal from '../ViewMoreModal';
import { useParams } from 'react-router-dom';

function HomeCardPost() {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    let { accountemail } = useParams();

    // Fetch announcements from the backend
    useEffect(() => {
        axios.get('http://localhost:3001/announcement/get/all')
            .then((response) => {
                var postsWithPublisherData = response.data.map(post => ({
                    ...post,
                    publisherName: '',
                    publisherProfilePicture: ProfilePicture, // Use default profile picture initially
                    eventName: '' // Placeholder for the event name
                }));
                if (accountemail) {
                    postsWithPublisherData = postsWithPublisherData.filter(post => post.publisher === accountemail);
                }
                postsWithPublisherData.reverse(); // Show most recent posts first
                setPosts(postsWithPublisherData);

                // Fetch publisher details and event name for each post
                postsWithPublisherData.forEach(post => {
                    // Fetch publisher details
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

                    // Fetch event details
                    axios.post('http://localhost:3001/event/get/id', { eventId: post.eventId })
                        .then((response) => {
                            const eventData = response.data || {};
                            setPosts(prevPosts =>
                                prevPosts.map(p =>
                                    p.announcementId === post.announcementId
                                        ? {
                                            ...p,
                                            eventName: eventData.title || 'Unknown Event'
                                        }
                                        : p
                                )
                            );
                        })
                        .catch((error) => {
                            console.error('Error fetching event details:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Error fetching announcements:', error);
            });
    }, [accountemail]);

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

                        <h2 className="post-title">{post.title}</h2>
                        <h3 className="post-title">{post.eventName || 'Loading event name...'}</h3>
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
                    eventName={selectedPost.eventName}
                    email={accountemail}
                />
            )}
        </div>
    );
}

export default HomeCardPost;
