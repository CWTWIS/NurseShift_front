import useShift from "../../../hook/ีuse-shift";
import { Eventcalendar } from "@mobiscroll/react";

export default function PersonalCalendar() {
  const { personalShifts } = useShift();
  console.log(personalShifts);
  return (
    <div>
      <p>Shifts of this user</p> {personalShifts.map((el) => el.id + " ")}
      <Eventcalendar data={personalShifts} />
    </div>
  );
}
