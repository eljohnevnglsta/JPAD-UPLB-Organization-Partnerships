
function MainHeader(){
    return (
        <div className="header-content">
            <div className="tailwind-scope">
                <h1 className="col-span-2 text-8xl font-bold text-center text-blue-500">
                    Welcome!
                </h1>
            </div>
            
            
            {/* Create Post and Create Event buttons */}
            
            <div className="create-buttons">
                <div className="btn-create-post text-blue-500 text-lg" onClick={() => window.location.href = "/createpost"}>  {/* NOTE: will change div to link once merged*/}
                    <span className="plus-icon">+</span> Create Post
                </div>
                
                <div className="btn-create-event text-blue-500 text-lg" onClick={() => window.location.href = "/createevent"}>  {/* NOTE: will change div to link once merged*/}
                    <span className="plus-icon">+</span> Create Event
                </div>
            </div>
        </div>
    );
}

export default MainHeader; 
