import { Link } from "react-router-dom";
import RegisterForm from "../features/auth/components/RegisterForm";
import ServiceDetail from "../features/auth/components/ServiceDetail";

export default function RegisterPage() {
  return (
    <div className="flex">
      <ServiceDetail />
      <div>
        <RegisterForm />
        <p>
          already have an account?{" "}
          <Link to="/login" className="underline font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
