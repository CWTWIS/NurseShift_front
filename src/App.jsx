import Router from "./route";
import useAuth from "./hook/use-auth";
import Spinner from "./components/Spinner";
import { ToastContainer, Slide } from "react-toastify";

function App() {
  const { initialLoading } = useAuth();
  if (initialLoading) return <Spinner />;
  return (
    <>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
        transition={Slide}
      />
    </>
  );
}

export default App;
