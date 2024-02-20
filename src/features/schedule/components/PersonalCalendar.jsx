import useShift from "../../../hook/ีuse-shift";
import { Eventcalendar } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

export default function PersonalCalendar() {
  const { personalShifts } = useShift();
  // console.log(personalShifts);
  return (
    <div>
      {/* <p>Shifts of this user</p> {personalShifts.map((el) => el.id + " ")} */}
      <Eventcalendar data={personalShifts} />
    </div>
  );
}
