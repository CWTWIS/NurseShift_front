import useShift from "../../../hook/ีuse-shift";

export default function PersonalCalendar() {
  const { personalShifts } = useShift();
  return (
    <div>
      <p>Shifts of this user</p> {personalShifts.map((el) => el.id + " ")}
    </div>
  );
}
