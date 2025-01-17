
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CardPost.module.css'
import ProfilePicture from '../../assets/YSES-logo.png'; 
import clockIcon from '../../assets/clock-solid.svg'; 

function CardPost({ publisher }) {
    const [announcements, setAnnouncements] = useState([]);

    // fetch announcements by organization
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.post('http://localhost:3001/announcement/get/all/org', {
                    publisher, // pass the publisher value here
                });
                console.log(response.data); // testing
                setAnnouncements(response.data); 
            } catch (error) {
                console.error('Error fetching announcements:', error.message);
            }
        };

        fetchAnnouncements();
    }, [publisher]); // refetch if publisher changes

    return (
        <div className={styles.postCards}>
            <h2>Recent Announcements</h2>
            {announcements.map((announcement) => (
                <div className={styles.postCard} key={announcement._id}>
                    <div className={styles.postHeader}>
                        <img className={styles.profilePicture} src={ProfilePicture} alt="Profile" />
                        <div className={styles.postMeta}>
                            <h2>{announcement.title}</h2>
                            <div className={styles.postDate}>
                                <img className={styles.clockIcon} src={clockIcon} alt="Clock" />
                                {new Date(announcement.announcementDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <h3 className={styles.postTitle}>{announcement.subtitle}</h3>
                    {announcement.description && (
                        <p className={styles.postContent}>{announcement.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CardPost;