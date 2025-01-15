import profilePicture from '../assets/YSES-logo.png'; 

function ProfilePicture() {

    return(
        <div className='profile-picture1-container'>
            <img className="profile-picture1" src={profilePicture} alt="Profile picture" />
        </div>
    );
}

export default ProfilePicture