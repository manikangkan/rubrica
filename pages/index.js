import Navbar from "../components/landingPage/Navbar";
import Main from "../components/landingPage/Main";
import AuthModal from "../components/landingPage/Auth.modal";
import { useState } from "react";
import axios from "axios";
import baseURL from "../utils/baseURL";

const LandingPage = ({ adminName }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return (
    <div className="bg-slate-50 h-screen overflow-hidden relative">
      <div className="max-w-7xl mx-auto h-full">
        <Navbar adminName={adminName} setIsAuthModalOpen={setIsAuthModalOpen} />
        <Main setIsAuthModalOpen={setIsAuthModalOpen} />
      </div>
      {/* auth modal for administration login or email invitation */}
      {isAuthModalOpen && <AuthModal setIsAuthModalOpen={setIsAuthModalOpen} />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${baseURL}/api/auth/${process.env.ADMIN_ID}`);
  const { data } = await res.data;
  return {
    props: {
      adminName: data.name,
    },
  };
};

export default LandingPage;
