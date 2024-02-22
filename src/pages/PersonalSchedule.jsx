import useAuth from "../hook/use-auth";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PersonalCalendar from "../features/schedule/components/PersonalCalendar";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import useShift from "../hook/ีuse-shift";
import Modal from "../components/Modal";
import EditProfileForm from "../features/profile/components/EditProfileForm";

export default function PersonalSchedule() {
  const { authUser } = useAuth();
  const { userId } = useParams();
  const { nurses } = useShift();

  const [open, setOpen] = useState(false);

  const selectedUser = nurses.find((user) => user.id === parseInt(userId));
  if (!selectedUser) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        This person is not in your department
      </div>
    );
  }

  const isCurrentUser = authUser.id === parseInt(userId);

  return (
    <div className="p-20 flex flex-col gap-8">
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
            <Button bg="blue" color="white" onClick={() => setOpen(true)}>
              Edit profile
            </Button>
          )}
        </div>
      </div>
      {open && (
        <Modal width={30} title="edit profile" onClose={() => setOpen(false)}>
          <EditProfileForm setOpen={setOpen} />
        </Modal>
      )}
      <hr />
      <PersonalCalendar userId={selectedUser.id} />
    </div>
  );
}
