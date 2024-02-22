import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";
import useAuth from "../hook/use-auth";

export default function Menu() {
  const { pathName } = useLocation();
  const { authUser } = useAuth();

  const menuList = [
    {
      id: 1,
      to: "/",
      title: "All",
    },
    { id: 2, to: `/personal/${authUser.id}`, title: "Personal" },
  ];

  return (
    <nav className="flex gap-2 justify-center py-1">
      {menuList.map((el) => (
        <MenuItem
          key={el.id}
          to={el.to}
          active={pathName === el.to}
          title={el.title}
        />
      ))}
    </nav>
  );
}
