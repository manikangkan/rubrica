import axios from "axios";
import Logo from "../shared/Logo";
import jwtDecode from "jwt-decode";

const Navbar = ({ user, setIsAuthModalOpen }) => {
  const isAdministratorLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("rubrica admin");

  return (
    <nav className="flex items-center justify-between m-4">
      <Logo />
      {isAdministratorLoggedIn ? (
        <p>
          Admin logged in as <strong>{user?.name}</strong>
        </p>
      ) : (
        <button
          className="bg-slate-200 border-none text-black"
          onClick={() => setIsAuthModalOpen(true)}>
          Administrator login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
