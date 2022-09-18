import Link from "next/link";
import { sidebarLinks } from "../../data/sidebarLinks";
import SidebarLink from "./SidebarLink";
import Logo from "../shared/Logo";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <aside className="col-span-1 bg-white h-full flex flex-col justify-between p-4">
      <Logo />
      {/* pages */}
      <div>
        {sidebarLinks.map((link) => (
          <Link href={`${link.path}/${id}`} key={link.name} passHref>
            <a>
              <SidebarLink name={link.name} path={link.path} />
            </a>
          </Link>
        ))}
      </div>
      <SidebarLink name="Sign out" />
    </aside>
  );
};

export default Sidebar;
