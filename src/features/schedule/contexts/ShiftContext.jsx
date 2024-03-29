import { createContext, useEffect, useState } from "react";
import * as shiftApi from "../../../api/shift";
import * as selectApi from "../../../api/select";
import useAuth from "../../../hook/use-auth";

export const ShiftContext = createContext();

export default function ShiftContextProvider({ children }) {
  const [shiftType, setShiftType] = useState([]);
  const [nurses, setNurses] = useState([]);

  const { authUser } = useAuth();
  useEffect(() => {
    const get = async () => {
      const getShiftType = await selectApi.getShiftType();
      setShiftType(getShiftType.data.shiftType);
      const getNurses = await shiftApi.fetchNursesInTheSameDepartment();
      setNurses(getNurses.data.allUsers);
    };
    get();
  }, [authUser]);

  const createShift = async (shiftData) => {
    try {
      console.log("shiftData", shiftData);
      console.log(shiftData.start.toISOString());
      const transformData = {
        userId: shiftData.userId,
        date: new Date(shiftData.start).toISOString(),
        shiftTypeId: shiftData.shiftTypeId,
      };
      console.log(transformData);
      const response = await shiftApi.createShift(transformData);
      return response.data;
    } catch (error) {
      console.error("Error creating shift:", error);
      throw error;
    }
  };

  const editShift = async (shiftId, shiftData) => {
    try {
      console.log("shiftId", shiftId);
      console.log("shiftData", shiftData);
      const response = await shiftApi.editShift(shiftId, shiftData);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error editing shift:", error);
      throw error;
    }
  };

  const deleteShift = async (shiftId) => {
    try {
      await shiftApi.deleteShift(shiftId);
    } catch (error) {
      console.error("Error deleting shift:", error);
      throw error;
    }
  };

  return (
    <ShiftContext.Provider
      value={{
        shiftType,
        nurses,
        createShift,
        editShift,
        deleteShift,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
}
