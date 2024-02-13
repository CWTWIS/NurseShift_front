import { Link } from "react-router-dom";
import LogInForm from "../features/auth/components/LoginForm";
import ServiceDetail from "../features/auth/components/ServiceDetail";

export default function LoginPage() {
  return (
    <div className="flex">
      <ServiceDetail />
      <div>
        <LogInForm />
        <p>
          don't have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
