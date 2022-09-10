import Logo from "../shared/Logo";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between m-4">
      <Logo />
      <div className="space-x-4">
        <button className="bg-transparent text-black">
          Administrator login
        </button>
        <button className="bg-transparent text-black">Invite</button>
      </div>
    </nav>
  );
};

export default Navbar;
