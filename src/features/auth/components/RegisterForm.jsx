import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function RegisterForm() {
  return (
    <form>
      <div>
        <div className="flex">
          <Input label="First name" placeholder="First name" />
          <Input label="Last name" placeholder="Last name" />
        </div>
        <div className="flex">
          <div className="flex flex-col">
            Department
            <select></select>
          </div>
          <div className="flex flex-col">
            Position
            <select></select>
          </div>
        </div>
        <Input label="Telephone number" placeholder="Telephone number" />
        <Input label="Email address" placeholder="Email address" />
        <Input label="Password" placeholder="Password" />
        <Input label="Confirm password" placeholder="Confirm password" />
      </div>
      <Button bg="green" color="white" width="full">
        SIGN UP
      </Button>
    </form>
  );
}
