import axios from "../config/axios";

export const editProfile = (userData) => axios.patch(`/users`, userData);
