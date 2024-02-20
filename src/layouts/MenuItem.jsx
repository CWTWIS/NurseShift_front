import { Link } from "react-router-dom";
export default function MenuItem({ active, to, title }) {
  return (
    <Link
      to={to}
      className={`${
        active ? "" : "hover:bg-sky-600 hover:text-white"
      } py-1 px-10 rounded-lg text-sky-600 font-semibold`}
    >
      {title}
    </Link>
  );
}
