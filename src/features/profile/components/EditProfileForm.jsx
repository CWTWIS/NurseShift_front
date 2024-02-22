import { useState, useEffect } from "react";
import PictureForm from "./PictureForm";
import Avatar from "../../../components/Avatar";
import useAuth from "../../../hook/use-auth";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function EditProfileForm({ setOpen }) {
  const {
    authUser: { firstName, lastName, email, mobile, profileImage },
    updateUser,
  } = useAuth();

  const initialFormData = {
    firstName,
    lastName,
    email,
    mobile,
    profileImage,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [changes, setChanges] = useState({});

  const [error, setError] = useState({});

  // const updateProfileImage = async (file) => {
  //   const formData = new FormData(); //object key ===> value
  //   formData.append("profileImage", file); //{profileImage: file}
  //   await updateUser(formData);
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("changes", changes);
      const newData = new FormData();
      for (const key in changes) {
        newData.append(key, changes[key]);
      }
      console.log("newData", newData);
      await updateUser(newData);
      setOpen(false);
    } catch (err) {
      if (err.response.data.message === "EMAIL_IN_USE") {
        return setError({
          email: "This email address is already in use",
        });
      }
      if (err.response.data.message === "MOBILE_IN_USE") {
        return setError({
          mobile: "This mobile number is already in use",
        });
      }
      toast.error("Internal server error");
      toast.error(err.response?.data.message);
    }
  };

  const handleProfileImageChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: file,
    }));
  };

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const changedFields = {};
    for (const key in formData) {
      if (formData[key] !== initialFormData[key]) {
        changedFields[key] = formData[key];
      }
    }
    console.log("changedFields", changedFields);
    setChanges(changedFields);
  }, [formData]);

  return (
    <div className="p-5">
      <PictureForm
        title="Profile picture"
        initialSrc={formData.profileImage}
        onSave={handleProfileImageChange}
      >
        {(src) => <Avatar size={10.5} src={src} />}
      </PictureForm>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Input
            type="text"
            name="firstName"
            label="First name"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChangeInput}
          />
          <Input
            type="text"
            name="lastName"
            label="Last name"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChangeInput}
          />
        </div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChangeInput}
        />
        <Input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChangeInput}
          errorMessage={error.mobile}
        />
        <Button type="submit" bg="blue" color="white" width="full">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
