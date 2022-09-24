import axios from "axios";
import Logo from "../shared/Logo";
import jwtDecode from "jwt-decode";

const Navbar = ({ user, setIsAuthModalOpen }) => {
  const isAdministratorLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("rubrica");
  const isEvoluterLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("rubrica-evoluter");

  const handleEvoluterLogin = async () => {
    try {
      const id = jwtDecode(isEvoluterLoggedIn).userId;
      const res = await axios.post(`${baseURL}/api/evoluter/login`, { id });
      localStorage.setItem("rubrica-evoluter", res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex items-center justify-between m-4">
      <Logo />
      <p>
        Admin logged in as <strong>{user?.name}</strong>
      </p>
      <div className="space-x-4">
        <button
          className="bg-slate-200 border-none text-black"
          onClick={() => setIsAuthModalOpen(true)}>
          Administrator login
        </button>
        <button
          className="bg-transparent text-black"
          onClick={() => setIsAuthModalOpen(true)}>
          Invite
        </button>
        <button
          className="bg-transparent text-black"
          onClick={handleEvoluterLogin}>
          Evoluter login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
