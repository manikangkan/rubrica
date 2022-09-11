import Navbar from "../components/landingPage/Navbar";
import Main from "../components/landingPage/Main";
import AuthModal from "../components/landingPage/Auth.modal";
import { useState } from "react";
import axios from "axios";
import baseURL from "../utils/baseURL";

const LandingPage = ({ evoluterName }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return (
    <div className="bg-slate-50 h-screen overflow-hidden relative">
      <div className="max-w-7xl mx-auto h-full">
        <Navbar
          evoluterName={evoluterName}
          setIsAuthModalOpen={setIsAuthModalOpen}
        />
        <Main setIsAuthModalOpen={setIsAuthModalOpen} />
      </div>
      {/* auth modal for administration login or email invitation */}
      {isAuthModalOpen && <AuthModal setIsAuthModalOpen={setIsAuthModalOpen} />}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  // const { id } = context.query;
  // const id = "631d8c6621b0e61c217912db";
  const id = "631d8ed321b0e61c217912e4";
  const res = await axios.get(`${baseURL}/api/evoluters/${id}`);
  const { data } = await res.data;
  return {
    props: {
      evoluterName: data.name,
    },
  };
};

export default LandingPage;
