import DropDown from "./DropDown";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="grid grid-cols-3 bg-green-200 items-center px-5">
      <div>NurseShift</div>
      <div>
        <Menu />
      </div>
      <div className="justify-self-end p-1.5">
        <DropDown />
      </div>
    </header>
  );
}
