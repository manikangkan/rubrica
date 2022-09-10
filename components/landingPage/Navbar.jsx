import Logo from "../shared/Logo";

const Navbar = ({ setIsAuthModalOpen }) => {
  return (
    <nav className="flex items-center justify-between m-4">
      <Logo />
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
    </nav>
  );
};

export default Navbar;
