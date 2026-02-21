import { createHashRouter } from "react-router-dom";
import App from "./App";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Signup2 from './pages/Signup2';
import Profile from "./pages/Profile";
import Input from "./pages/Input";
import Workouts from "./pages/Workouts";
import PrivateRoute from "./pages/PrivateRoute";

export const router = createHashRouter([
    { path:"/", element: <App /> },
    { path:"/signup", element: <Signup /> },
    { path:"/signup2", element: <Signup2 /> },
    { path:"/signin", element: <Signin /> },
    { path:"/Profile", element: <PrivateRoute> <Profile /></PrivateRoute> },
    { path:"/input", element: <PrivateRoute> <Input /></PrivateRoute> },
    { path:"/workouts", element: <PrivateRoute> <Workouts /></PrivateRoute> },
    { path:"*", element: "PAGE NOT FOUND"},
]);