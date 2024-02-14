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
    <form onSubmit={handleFormSubmit} className="min-w-[400px]">
      <div>
        <div className="flex gap-3">
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
        <div className="flex gap-3">
          <div className="flex flex-col flex-1">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5 "
              value={input.departmentId}
              name="departmentId"
              onChange={handleChangeInput}
            >
              <option selected value="0">
                --select--
              </option>
              {department.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.typeOfDepartment}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="position">Position</label>
            <select
              id="position"
              className="  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={input.positionId}
              name="positionId"
              onChange={handleChangeInput}
            >
              <option selected value="0">
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
      <div className="pt-5 pb-1">
        <Button bg="green" color="white" width="full">
          SIGN UP
        </Button>
      </div>
    </form>
  );
}
