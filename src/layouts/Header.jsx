import DropDown from "./DropDown";
import Menu from "./Menu";
import logo from "../assets/NurseShiftLogo2.png";

export default function Header() {
  return (
    <header className="sticky top-0 w-full grid grid-cols-3 bg-sky-200 items-center px-20 z-40">
      <img src={logo} className="w-[130px]" />
      <div>
        <Menu />
      </div>
      <div className="justify-self-end p-1.5">
        <DropDown />
      </div>
    </header>
  );
}
