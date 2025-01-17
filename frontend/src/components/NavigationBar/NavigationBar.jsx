import styles from './NavigationBar.module.css'
import ProfilePicture from '../../assets/YSES-logo.png'; 
import SearchIcon from '../../assets/magnifying-glass-solid.svg'; 

function NavigationBar() {

  return (
    <header className={styles.navHeader}>
        <div className={styles.logo}>
            <h1>kasangga</h1>
        </div>

        {/* NOTE: will change div to link once merged*/}
        <nav className={styles.navLinks}>
          <div className={styles.navItemDashboard}><h1>dashboard</h1></div>
          <div className={styles.navItemSearch}><img className={styles.searchIcon} src={SearchIcon} alt="Search Icon" /></div>
          <div className={styles.navItemProfile}><img className={styles.profilePicture} src={ProfilePicture} alt="Profile Pic" /></div>
        </nav>
    </header>
  );

}

export default NavigationBar;