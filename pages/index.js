import Navbar from "../components/landingPage/Navbar";
import Main from "../components/landingPage/Main";
import AuthModal from "../components/landingPage/Auth.modal";
import { useState } from "react";

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return (
    <div className="bg-slate-50 h-screen overflow-hidden relative">
      <div className="max-w-7xl mx-auto h-full">
        <Navbar setIsAuthModalOpen={setIsAuthModalOpen} />
        <Main setIsAuthModalOpen={setIsAuthModalOpen} />
      </div>
      {/* auth modal for administration login or email invitation */}
      {isAuthModalOpen && <AuthModal setIsAuthModalOpen={setIsAuthModalOpen} />}
    </div>
  );
};

export function getServerSideProps() {
  return {
    props: { title: "Rubrica - 21st century rubric builder" },
  };
}

export default LandingPage;
