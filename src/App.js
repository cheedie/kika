import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Landing from "./components/landing-page/Landing";
import Vendor from "./components/vendor/Vendor";
import Signup from "./components/User/Signup";
import Signin from "./components/User/Signin";
import UserAccount from "./pages/user/UserAccountPage";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "/user/signup", element: <Signup /> },
    { path: "/user/signin", element: <Signin /> },
    { path: "/vendor", element: <Vendor /> },
    { path: "/user/account", element: <UserAccount /> },

    { path: "/buyer/signup", element: <Signup /> },
    { path: "/buyer/signin", element: <Signin /> },
    { path: "/vendor/*", element: <Vendor /> },
  ]);
  return routes;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
