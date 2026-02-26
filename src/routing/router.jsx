import { createHashRouter } from "react-router-dom";
import App from "../App";
import Signin from "../pages/signIn/Signin";
import Signup from "../pages/signIn/Signup";
import Signup2 from '../pages/signIn/Signup2';
import Stats from "../pages/stats/Stats";
import EditStats from "../pages/stats/EditStats";
import Input from "../pages/input/Input";
import Workouts from "../pages/workout/Workouts";
import PrivateRoute from "./PrivateRoute";

export const router = createHashRouter([
    { path:"/", element: <App /> },
    { path:"/signup", element: <Signup /> },
    { path:"/signup2", element: <Signup2 /> },
    { path:"/signin", element: <Signin /> },
    { path:"/stats", element: <PrivateRoute> <Stats /></PrivateRoute> },
    { path:"/editStats", element: <PrivateRoute> <EditStats /></PrivateRoute>},
    { path:"/input", element: <PrivateRoute> <Input /></PrivateRoute> },
    { path:"/workouts", element: <PrivateRoute> <Workouts /></PrivateRoute> },
    { path:"*", element: "PAGE NOT FOUND"},
]);