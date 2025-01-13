import profilePicture from '../assets/YSES-logo.png'; 

function ProfilePicture() {

    return(
        <div className='profile-picture-container'>
            <img className="profile-picture" src={profilePicture} alt="Profile picture" />
        </div>
    );
}

export default ProfilePicture