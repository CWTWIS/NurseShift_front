import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useAuth from "../../../hook/use-auth";

import * as selectApi from "../../../api/select";

export default function RegisterForm() {
  const [position, setPosition] = useState([]);
  const [department, setDepartment] = useState([]);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    positionId: "",
    departmentId: "",
  });

  const { register } = useAuth();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("submit");
      // const validateError = validateRegister(input);
      // if (validateError) {
      //   return setError(validateError);
      // }
      await register(input);
      toast.success("register successfully");
      onSuccess();
    } catch (err) {
      // if (err.response?.data.message === "EMAIL_MOBILE_IN_USE") {
      //   return setError({
      //     emailOrMobile: "email address or mobile number already in use",
      //   });
      // }
      // toast.error("Internal server error");
      toast.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    const get = async () => {
      const getPosition = await selectApi.getPosition();
      const getDepartment = await selectApi.getDepartment();
      setPosition(getPosition.data.positions);
      setDepartment(getDepartment.data.departments);
    };
    get();
  }, []);
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <div className="flex">
          <Input
            label="First name"
            placeholder="First name"
            id="firstName"
            name="firstName"
            value={input.firstName}
            onChange={handleChangeInput}
          />
          <Input
            label="Last name"
            placeholder="Last name"
            id="lastName"
            name="lastName"
            value={input.lastName}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              className="select"
              value={input.departmentId}
              name="departmentId"
              onChange={handleChangeInput}
            >
              <option disabled value="0">
                --select--
              </option>
              {department.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.typeOfDepartment}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="position">Position</label>
            <select
              id="position"
              className="select"
              value={input.positionId}
              name="positionId"
              onChange={handleChangeInput}
            >
              <option disabled value="0">
                --select--
              </option>
              {position.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.typeOfPosition}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Input
          label="Telephone number"
          placeholder="Telephone number"
          id="telephone"
          name="mobile"
          value={input.mobile}
          onChange={handleChangeInput}
        />
        <Input
          label="Email address"
          placeholder="Email address"
          id="email"
          name="email"
          value={input.email}
          onChange={handleChangeInput}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          id="password"
          name="password"
          value={input.password}
          onChange={handleChangeInput}
        />
        <Input
          type="password"
          label="Confirm password"
          placeholder="Confirm password"
          id="confirm"
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={handleChangeInput}
        />
      </div>
      <Button bg="green" color="white" width="full">
        SIGN UP
      </Button>
    </form>
  );
}
