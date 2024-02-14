import { useState } from "react";
import useAuth from "../../../hook/use-auth";
import { toast } from "react-toastify";

import Button from "../../../components/Button";
import Input from "../../../components/Input";

import validateLogin from "../validations/validate-login";

export default function LogInForm() {
  const { login } = useAuth();
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const validationError = validateLogin(input);
      if (validationError) {
        return setError(validationError);
      }
      await login(input);
      toast.success("login successfully");
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="min-w-[400px]">
      <div>
        <div className="flex flex-col">
          <Input
            label="Email"
            placeholder="Email address"
            value={input.email}
            name="email"
            onChange={handleChangeInput}
            errorMessage={error.email}
          />
        </div>
        <div className="flex flex-col">
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            value={input.password}
            name="password"
            onChange={handleChangeInput}
            errorMessage={error.password}
          />
        </div>
      </div>
      <div className="pt-5 pb-1">
        <Button bg="green" color="white" width="full">
          LOG IN
        </Button>
      </div>
    </form>
  );
}
