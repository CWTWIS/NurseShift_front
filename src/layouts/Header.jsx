import DropDown from "./DropDown";
import Menu from "./Menu";
import logo from "../assets/NurseShiftLogo2.png";

export default function Header() {
  return (
    <header className="grid grid-cols-3 bg-sky-200 items-center px-5">
      <img src={logo} className="w-[130px]" />
      {/* <div>NurseShift</div> */}
      <div>
        <Menu />
      </div>
      <div className="justify-self-end p-1.5">
        <DropDown />
      </div>
    </header>
  );
}
