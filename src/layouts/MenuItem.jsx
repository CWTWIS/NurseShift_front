import { Link } from "react-router-dom";
export default function MenuItem({ active, to, title }) {
  return (
    <Link
      to={to}
      className={`${active ? "" : "hover:bg-gray-300"} py-1 px-10 rounded-lg`}
    >
      {title}
    </Link>
  );
}