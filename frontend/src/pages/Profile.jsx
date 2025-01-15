import { useState } from 'react';
import "../stylesheets/profile.css"
import NavigationBar from "../components/NavigationBar/NavigationBar";
import About from "../components/About";
import SidePanel from "../components/SideProfilePanel";
import MainPanel from "../components/MainProfilePanel";
import ButtonProfile from "../components/ButtonProfile";
import EditProfileModal from '../components/EditProfileModal';
import PartnerModal from '../components/PartnerModal';

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false); // for Edit Profile Modal
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false); // for Partner Modal

  const openModal = () => setIsModalOpen(true); // open Edit Profile Modal
  const closeModal = () => setIsModalOpen(false); // close Edit Profile Modal

  const openPartnerModal = () => setIsPartnerModalOpen(true); // same as above but for Partner Modal
  const closePartnerModal = () => setIsPartnerModalOpen(false); 

  return (
    <>
      <div className="nav-bar">
          <NavigationBar/>
      </div>

      <About />
      
      <div className="profile-body">
        <div className="body-side">
          <ButtonProfile isPrivateView={true} onEditProfileClick={openModal}  onPartnerClick={openPartnerModal}/> {/* pass the functions to the buttons*/}
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
