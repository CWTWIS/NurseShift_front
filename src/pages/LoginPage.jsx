import { Link } from "react-router-dom";
import LogInForm from "../features/auth/components/LoginForm";
import ServiceDetail from "../features/auth/components/ServiceDetail";

export default function LoginPage() {
  return (
    <div className="grid h-screen place-items-center ">
      <div className="flex justify-center gap-5">
        <ServiceDetail />
        <div className="bg-white p-5 outline outline-2 outline-gray-200 rounded-md shadow-md">
          <LogInForm />
          <p className="text-center">
            don't have an account?{" "}
            <Link to="/register" className="underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
