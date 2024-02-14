import { useEffect, useRef, useState } from "react";

import Avatar from "../components/Avatar";
import useAuth from "../hook/use-auth";
import Button from "../components/Button";

export default function DropDown() {
  const [open, setOpen] = useState(false);

  const dropDownEl = useRef(null);

  const {
    authUser: { profileImage, firstName, lastName },
    logout,
  } = useAuth();

  useEffect(() => {
    if (open) {
      const handleClickOutside = (e) => {
        if (dropDownEl.current && !dropDownEl.current.contains(e.target))
          setOpen(false);
      };
      document.addEventListener("mouseup", handleClickOutside);
      return () => document.removeEventListener("mouseup", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative" ref={dropDownEl}>
      <div role="button" onClick={() => setOpen(!open)}>
        <Avatar src={profileImage} />
      </div>
      {open && (
        <div className="absolute right-0 translate-y-2">
          <Avatar src={profileImage} />
          <div>
            <span>
              {firstName} {lastName}
            </span>
            <Button color="white" bg="blue" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
