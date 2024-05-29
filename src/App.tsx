import React from "react";
import Home from "./components/home/Home";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Search from "./components/search/Search";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/sign-up/Signup";
import Rootlayout from "./components/root/Root";
import EditUser from "./components/edit/edit-user/EditUser";
import { loginAction, registerAction, logoutAction, authTokenLoader, checkAuthLoader } from "./components/shared/service/auth.service";
import Logout from "./components/auth/logout/Logout";
//import { userLoader } from "./components/shared/service/user.service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    id: 'root',
    loader: authTokenLoader,
    //errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search />, loader: checkAuthLoader}, // loader: userLoader },
      { path: "edit/:userId", element: <EditUser />, loader: checkAuthLoader },
      { path: "login", element: <Login />, action:  loginAction},
      { path: "logout", element: <Logout />, action:  logoutAction},
      { path: "register", element: <Signup />, action: registerAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
