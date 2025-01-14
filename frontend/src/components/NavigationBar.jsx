import ProfilePicture from '../assets/YSES-logo.png'; 
import SearchIcon from '../assets/magnifying-glass-solid.svg'; 

function NavigationBar() {

  return (
    <header className="nav-header">
        <div className="logo">
            <h1>sitename</h1>
        </div>

        {/* NOTE: will change div to link once merged*/}
        <nav className="nav-links">
          <div className="nav-item dashboard"><h1>dashboard</h1></div>
          <div className="nav-item search"><img className="search-icon" src={SearchIcon} alt="Search Icon" /></div>
          <div className="nav-item profile"><img className="profile-picture" src={ProfilePicture} alt="Profile Pic" /></div>
        </nav>
    </header>
    
  );

}

export default NavigationBar;