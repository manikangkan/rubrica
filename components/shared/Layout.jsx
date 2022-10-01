import { useRouter } from "next/router";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  const router = useRouter();
  if (router.pathname === "/" || router.pathname === "/verification")
    return <>{children}</>;
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
