import Logo from "../shared/Logo";

const Navbar = ({ user, setIsAuthModalOpen }) => {
  const isAdministratorLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("rubrica");

  return (
    <nav className="flex items-center justify-between m-4">
      <Logo />
      {isAdministratorLoggedIn ? (
        <p>
          Admin logged in as <strong>{user?.name}</strong>
        </p>
      ) : (
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
