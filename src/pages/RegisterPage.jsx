import { Link } from "react-router-dom";
import RegisterForm from "../features/auth/components/RegisterForm";
import ServiceDetail from "../features/auth/components/ServiceDetail";

export default function RegisterPage() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex gap-5">
        <ServiceDetail />
        <div className="bg-white p-5 outline outline-2 outline-gray-200 rounded-md shadow-md">
          <RegisterForm />
          <p className="text-center">
            already have an account?{" "}
            <Link to="/login" className="underline font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
