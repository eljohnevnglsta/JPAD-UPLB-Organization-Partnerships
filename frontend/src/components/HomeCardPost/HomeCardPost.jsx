
import { useState } from 'react';
import styles from './HomeCardPost.module.css'
import ProfilePicture from '../../assets/YSES-logo.png'; 
import orgLogo from '../../assets/sample-org-logo.png'; 
import clockIcon from '../../assets/clock-solid.svg'; 
import sampleImage from '../../assets/sample-post-image.jpg';
import partnershipIcon from '../../assets/partnership.svg';
import ViewMoreModal from '../ViewMoreModal/ViewMoreModal'; 

function HomeCardPost() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);


    const posts = [
        {
            id: 1,
            title: "Young Software Engineers' Society",
            date: "1 hour ago",
            subtitle: (
                <>
                    made partnership with <b>Sample Organization</b> for their event <b>Sample Event Name</b>
                </>
            ),
            content: "",
            image: partnershipIcon,
            isIcon: true,
            orgLogo: orgLogo,

        },
        {
            id: 2,
            title: "Young Software Engineers' Society",
            date: "22 hours ago",
            subtitle: "Looking for Media Partners for our Junior Hackathon Event",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
        },
        {
            id: 3,
            title: "Young Software Engineers' Society",
            date: "4 days ago",
            subtitle: "Looking for Media Partners for our Junior Hackathon Event",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
            image: sampleImage
        }


    ];

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    };

    return (
        <div className={styles.postCards}>
            <h2>Recent Posts</h2>
            {posts.map((post) => (
                <div className={styles.postCard} key={post.id}>
                    <div className={styles.postHeader}>
                        <img className={styles.profilePicture} src={ProfilePicture} alt="Profile picture" />
                        <div className={styles.postMeta}>
                            <h2>{post.title}</h2>
                            <div className={styles.postDate}>
                                <img className={styles.clockIcon} src={clockIcon} alt="Clock Icon" />
                                {post.date}
                            </div>
                        </div>
                    </div>
    
                    {/* Render icon after the title and before the subtitle */}
                    {post.isIcon && (
                        <div className={styles.postIconContainer}>
                            <img className={styles.postIcon} src={post.image} alt="Icon visual" />
                            {post.orgLogo && (
                                <img className={styles.orgLogo} src={post.orgLogo} alt="Organization logo" />
                            )}
                        </div>
                    )}
    
                    <h3 className={styles.postTitle}>{post.subtitle}</h3>
    
                    {/* Render content preview only if content exists */}
                    {post.content && <p className={styles.postContent}>{post.content.substring(0, 500)}...</p>}
    
                    {/* Show "View More" button only if there is content */}
                    {post.content && (
                        <button className={styles.btnView} onClick={() => openModal(post)}>
                            View More
                        </button>
                    )}
    
                    {/* Display image after "View More" button if not an icon */}
                    {!post.isIcon && post.image && (
                        <div className={styles.postImage}>
                            <img src={post.image} alt="Post visual" />
                        </div>
                    )}
                </div>
            ))}
    
            {/* View More Modal */}
            {selectedPost && (
                <ViewMoreModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    postDetails={selectedPost}
                />
            )}
        </div>
    );
    
}

export default HomeCardPost;