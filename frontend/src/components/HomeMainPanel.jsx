import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./MainHeader";
import HomeCardPost from "./HomeCardPost/HomeCardPost";
import ShowMoreButton from "./ShowMoreButton";

function HomeMainPanel() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const [totalPages, setTotalPages] = useState(1);

    // Fetch paginated announcements from the backend
    useEffect(() => {
        axios.get(`http://localhost:3001/announcement/get/all?page=${currentPage}&limit=${postsPerPage}`)
            .then((response) => {
                const { announcements, totalPages } = response.data;
                setPosts(announcements);
                setTotalPages(totalPages);
            })
            .catch((error) => {
                console.error('Error fetching announcements:', error);
            });
    }, [currentPage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="main-panel-profile">
            <Header />
            <HomeCardPost posts={posts} />
            <div className="pagination-controls">
                <ShowMoreButton
                    onPreviousClick={goToPreviousPage}
                    onShowMoreClick={goToNextPage}
                    showPrevious={currentPage > 1} // previous btn will only show up when pages > 1
                />
            </div>
        </div>
    );
}

export default HomeMainPanel;
