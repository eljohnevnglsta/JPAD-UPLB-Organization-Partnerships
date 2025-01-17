import styles from './NavigationBar.module.css'
import ProfilePicture from '../../assets/YSES-logo.png'; 
import SearchIcon from '../../assets/magnifying-glass-white-solid.svg'; 
import { useEffect, useState } from 'react';
import axios from 'axios';

function NavigationBar() {
  const account = JSON.parse(localStorage.getItem('account'));
  const [accountData, setAccountData] = useState({});
  useEffect(() => {
    axios.post('http://localhost:3001/account/get', { email: account.email })
      .then((response) => {
        setAccountData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <header className={styles.navHeader}>
        <div className={styles.logo} onClick={() => window.location.href = "/"} style={{cursor: 'pointer'}}>
            <h1>kasangga</h1>
        </div>  
        <nav className={styles.navLinks}>
          <a className={styles.navItemDashboard} href="/dashboard"><h2>dashboard</h2></a>
          <a className={styles.navItemPartnerships} href="/management"><h2>partnerships</h2></a>
          <div className={styles.navItemSearch} onClick={() => window.location.href = "/search"}><img className={styles.searchIcon} src={SearchIcon} alt="Search Icon" /></div>
          <div className={styles.navItemProfile} onClick={() => window.location.href = `/profile/${account.email}`}><img className={styles.profilePicture} src={accountData.profilePicture} alt="Profile Pic" /></div>
        </nav>
    </header>
  );

}
export default NavigationBar; 