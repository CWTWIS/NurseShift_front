import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function LogInForm() {
  return (
    <form>
      <div>
        <div className="flex flex-col">
          <Input label="Email" placeholder="Email address" />
        </div>
        <div className="flex flex-col">
          <Input label="Password" placeholder="Password" />
        </div>
      </div>
      <Button bg="green" color="white" width="full">
        Login
      </Button>
    </form>
  );
}
