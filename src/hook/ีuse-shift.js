import { useContext } from "react";
import { ShiftContext } from "../features/schedule/contexts/ShiftContext";

export default function useShift() {
  return useContext(ShiftContext);
}
