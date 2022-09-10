import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div
      className="bg-slate-50 h-screen grid grid-cols-4 overflow-hidden
    ">
      <Sidebar />
      <main className="col-span-3 h-full p-4 relative">{children}</main>
    </div>
  );
};

export default Layout;
