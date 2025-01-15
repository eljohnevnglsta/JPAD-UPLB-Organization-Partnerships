
function MainHeader(){
    return (
    
        <div className="header-content">
            <h1>Welcome!</h1>
            
            {/* Create Post and Create Event buttons */}
            
            <div className="create-buttons">
                <div className="btn-create-post">  {/* NOTE: will change div to link once merged*/}
                    <span className="plus-icon">+</span> Create Post
                </div>
                
                <div className="btn-create-event">  {/* NOTE: will change div to link once merged*/}
                    <span className="plus-icon">+</span> Create Event
                </div >
            </div>
        </div>
    );
}

export default MainHeader; 
