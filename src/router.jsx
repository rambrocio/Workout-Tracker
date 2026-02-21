import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Input from "./pages/Input";
import Workouts from "./pages/Workouts";
import PrivateRoute from "./pages/PrivateRoute";

export const router = createBrowserRouter([
    { path:"/", element: <App /> },
    { path:"/signup", element: <Signup /> },
    { path:"/signin", element: <Signin /> },
    { path:"/dashboard", element: <PrivateRoute> <Dashboard /></PrivateRoute> },
    { path:"/input", element: <PrivateRoute> <Input /></PrivateRoute> },
    { path:"/workouts", element: <PrivateRoute> <Workouts /></PrivateRoute> },
    { path:"*", element: "PAGE NOT FOUND"},
]);