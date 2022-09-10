import { useRouter } from "next/router";

const SidebarLink = ({ name, path }) => {
  const router = useRouter();

  return (
    <div
      className={`w-full p-4 hover:bg-slate-200 hover:font-bold cursor-pointer rounded ${
        router.pathname.includes(path) && "bg-slate-200 font-bold"
      }`}>
      {name}
    </div>
  );
};

export default SidebarLink;
