import axios from "../config/axios";

export const getPosition = () => axios.get("/position");
export const getDepartment = () => axios.get("/department");
export const getShiftType = () => axios.get("/shiftType");
