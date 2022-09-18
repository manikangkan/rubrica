import Navbar from "../components/landingPage/Navbar";
import Main from "../components/landingPage/Main";
import { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../utils/baseURL";
import AuthModal from "../components/landingPage/Auth.modal";
import jwtDecode from "jwt-decode";

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isAdministratorLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("rubrica");
  
  useEffect(() => {
    if (isAdministratorLoggedIn) {
      const fetchAdminDetails = async () => {
        const url = `${baseURL}/api/auth/${
          jwtDecode(localStorage.getItem("rubrica")).userId
        }`;
        const payload = { headers: { Authorization: isAdministratorLoggedIn } };
        const response = await axios.get(url, payload);
        const { data } = response.data;
        setUser(data);
      };
      fetchAdminDetails();
    }
  }, [isAdministratorLoggedIn]);

  return (
    <div className="bg-slate-50 h-screen overflow-hidden relative">
      <div className="max-w-7xl mx-auto h-full">
        <Navbar user={user} setIsAuthModalOpen={setIsAuthModalOpen} />
        <Main setIsAuthModalOpen={setIsAuthModalOpen} />
      </div>
      {/* auth modal for administration login or email invitation */}
      {isAuthModalOpen && <AuthModal setIsAuthModalOpen={setIsAuthModalOpen} />}
    </div>
  );
};

export default LandingPage;
