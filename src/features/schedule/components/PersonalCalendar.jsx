import useShift from "../../../hook/ีuse-shift";
import { useState } from "react";
import { Eventcalendar } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useEffect } from "react";
import * as shiftApi from "../../../api/shift";

export default function PersonalCalendar(userId) {
  const [personalShifts, setPersonalShifts] = useState([]);
  useEffect(() => {
    const get = async () => {
      const getPersonalShifts = await shiftApi.fetchShiftsByUserId(
        userId.userId
      );
      const mappedShifts = getPersonalShifts.data.shifts.map((shift) => ({
        id: shift.id,
        date: new Date(shift.date).setHours(0, 0, 0, 0),
        title: shift.shiftType.typeOfShift,
        color:
          shift.shiftType.id === 1
            ? "#FFF59D"
            : shift.shiftType.id === 2
            ? "orange"
            : "#1A237E",
        resource: shift.userId,
      }));
      setPersonalShifts(mappedShifts);
    };
    get();
  }, [userId]);
  return (
    <div>
      <Eventcalendar data={personalShifts} />
    </div>
  );
}
