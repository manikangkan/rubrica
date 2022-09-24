import { useRouter } from "next/router";

const SidebarLink = ({ name, path, ...props }) => {
  const router = useRouter();

  return (
    <div
      {...props}
      className={`w-full p-4 hover:bg-slate-200 hover:font-bold cursor-pointer rounded my-1 ${
        router.pathname.includes(path) && "bg-slate-200 font-bold"
      }`}>
      {name}
    </div>
  );
};

export default SidebarLink;
