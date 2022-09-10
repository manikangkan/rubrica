import Link from "next/link";
import { sidebarLinks } from "../../data/sidebarLinks";
import SidebarLink from "./SidebarLink";
import Logo from "../shared/Logo";
import { useRouter } from "next/router";

const Sidebar = () => {
  return (
    <aside className="col-span-1 bg-white h-full flex flex-col justify-between p-4">
      <Logo />
      {/* pages */}
      <div className="space-y-2">
        {sidebarLinks.map((link) => (
          <Link
            href={link.path}
            className="block py-2 px-4 hover:bg-gray-100"
            key={link.name}>
            <SidebarLink name={link.name} path={link.path} />
          </Link>
        ))}
      </div>
      <SidebarLink name="Sign out" />
    </aside>
  );
};

export default Sidebar;
