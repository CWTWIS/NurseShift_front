import PersonalCalendar from "../features/schedule/components/PersonalCalendar";
import useAuth from "../hook/use-auth";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import useShift from "../hook/ีuse-shift";

export default function PersonalSchedule() {
  const { authUser } = useAuth();
  const { userId } = useParams();
  const { nurses } = useShift();

  const selectedUser = nurses.find((user) => user.id === parseInt(userId));
  if (!selectedUser) {
    return <div>This person is not in your department</div>;
  }

  const isCurrentUser = authUser.id === parseInt(userId);

  return (
    <div className="p-10 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex justify-center items-center">
            <Avatar size={4} src={selectedUser.profileImage} />
          </div>
          <div className="text-sm">
            <p className="font-semibold">
              {selectedUser.firstName} {selectedUser.lastName}
            </p>
            <p>Email: {selectedUser.email}</p>
            <p>Tel: {selectedUser.mobile}</p>
          </div>
        </div>
        <div>
          {isCurrentUser && (
            <Button bg="blue" color="white">
              Edit profile
            </Button>
          )}
        </div>
      </div>
      <hr />
      {/* <h1>Personal schedule</h1> */}
      <PersonalCalendar userId={selectedUser.id} />
    </div>
  );
}
