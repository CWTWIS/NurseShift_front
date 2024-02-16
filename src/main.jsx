import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./features/auth/contexts/AuthContext.jsx";
import ShiftContextProvider from "./features/schedule/contexts/ShiftContext.jsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <ShiftContextProvider>
      <App />
    </ShiftContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>,
);
