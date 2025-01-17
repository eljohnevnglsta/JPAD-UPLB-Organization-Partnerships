import { useState } from 'react';
import "../stylesheets/profile.css"
import NavigationBar from "../components/NavigationBar/NavigationBar";
import About from "../components/About";
import SidePanel from "../components/SideProfilePanel";
import MainPanel from "../components/MainProfilePanel";
import ButtonProfile from "../components/ButtonProfile";
import EditProfileModal from '../components/EditProfileModal';
import PartnerModal from '../components/PartnerModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false); // for Edit Profile Modal
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false); // for Partner Modal

  const openModal = () => setIsModalOpen(true); // open Edit Profile Modal
  const closeModal = () => setIsModalOpen(false); // close Edit Profile Modal

  const openPartnerModal = () => setIsPartnerModalOpen(true); // same as above but for Partner Modal
  const closePartnerModal = () => setIsPartnerModalOpen(false); 

  const userAccount = JSON.parse(localStorage.getItem('account'));
  const {accountemail} = useParams();

  return (
    <>
      <div className="nav-bar">
          <NavigationBar/>
      </div>

      <About />
      
      <div className="profile-body">
        <div className="body-side">
          <ButtonProfile isPrivateView={userAccount.email === accountemail} onEditProfileClick={openModal}  onPartnerClick={openPartnerModal}/> {/* pass the functions to the buttons*/}
          {userAccount.email === accountemail && <div className="tailwind-scope">
            <button 
              className="bg-red-500 text-white font-bold py-2 w-full px-4 mb-1 rounded-3xl hover:bg-red-700"
              onClick={() => {
                axios.get('http://localhost:3001/account/logout').
                then((response) => {
                  if (!response.data.success) {
                    alert('Error logging out');
                    return;
                  } 
                }).catch((error) => {
                  console.log(error.message);
                });

                localStorage.removeItem('account');
                window.location.href = '/login';
              }}
            >
              Logout
            </button>
          </div>}
          <SidePanel />
        </div>
        <MainPanel />
      </div>     

      {/* conditional rendering for modals */}
      {isModalOpen && <EditProfileModal onClose={closeModal} />}
      {isPartnerModalOpen && <PartnerModal onClose={closePartnerModal} />}
    </>
  );
}

export default Profile;
