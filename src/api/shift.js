import axios from "axios";

export const fetchNursesInTheSameDepartment = () => axios.get("/auth/all");
export const fetchShiftsByDepartmentId = () => axios.get("/shift");
export const fetchShiftsByUserId = () => axios.get("/shift/me");
export const createShift = (shiftData) => axios.post("/shift", shiftData);
export const editShift = (shiftId, shiftData) =>
  axios.patch(`/shift/${shiftId}`, shiftData);
export const deleteShift = (shiftId) => axios.delete(`/shift/${shiftId}`);
