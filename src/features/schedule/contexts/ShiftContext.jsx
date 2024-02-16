import { createContext, useEffect, useState } from "react";
import * as shiftApi from "../../../api/shift";
import * as selectApi from "../../../api/select";
import useAuth from "../../../hook/use-auth";

export const ShiftContext = createContext();

export default function ShiftContextProvider({ children }) {
  const [shiftType, setShiftType] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [shiftsSameDepartment, setShiftsSameDepartment] = useState([]);
  const [personalShifts, setPersonalShifts] = useState([]);

  const { authUser } = useAuth();
  useEffect(() => {
    const get = async () => {
      const getShiftType = await selectApi.getShiftType();
      setShiftType(getShiftType.data.shiftType);
      const getNurses = await shiftApi.fetchNursesInTheSameDepartment();
      setNurses(getNurses.data.allUsers);
      const getShifts = await shiftApi.fetchShiftsByDepartmentId();
      setShiftsSameDepartment(getShifts.data.shifts);
      const getPersonalShifts = await shiftApi.fetchShiftsByUserId();
      setPersonalShifts(getPersonalShifts.data.shifts);
    };
    get();
  }, [authUser]);

  return (
    <ShiftContext.Provider
      value={{ shiftType, nurses, shiftsSameDepartment, personalShifts }}
    >
      {children}
    </ShiftContext.Provider>
  );
}
