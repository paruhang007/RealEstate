import LoginPage from "./assets/pages/LoginPage";
import SignUpPage from "./assets/pages/SignUpPage";
import ForgotPassPage from "./assets/pages/ForgotPassPage";
import VerifyEmailNumberPage from "./assets/pages/VerifyEmailNumberPage";
import ResetPassPage from "./assets/pages/ResetPassPage";
import HomePage from "./assets/pages/HomePage";
import Navbar from "./assets/components/Dashboard/Navbar";
import Property from "./assets/components/Dashboard/Property";
import UnitConverter from "./assets/components/Dashboard/UnitConverter";
import EmiCalculator from "./assets/components/Dashboard/EmiCalculator";
import AddProperty from "./assets/components/UserDashboard/AddProperty";
import UserProfile from "./assets/components/UserDashboard/UserProfile";
import ChangePassword from "./assets/components/UserDashboard/ChangePassword";

import React from "react";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import Sidebar from "./assets/components/UserDashboard/SideBar";
import UseDashPage from "./assets/pages/UserDashPage";

const App = () => {
  const routes = createBrowserRouter([
    {
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          // all the other routes the user can navigate to like about us, contact us, etc.
          path: "/property",
          element: <Property />,
        },
        {
          // all the other routes the user can navigate to like about us, contact us, etc.
          path: "/unitconvert",
          element: <UnitConverter />,
        },
        {
          // all the other routes the user can navigate to like about us, contact us, etc.
          path: "/emical",
          element: <EmiCalculator />,
        },
        {
          element: <Sidebar />,
          children: [
            {
              path: "/dashboard",
              element: <UseDashPage />,
            },
            {
              path: "/profile",
              element: <UserProfile />,
            },
            {
              path: "/changepass",
              element: <ChangePassword />,
            },

            {
              path: "/addproperty",
              element: <AddProperty />,
            },
          ],
        },

        {
          path: "/userprofile",
          element: <AddProperty />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/forpass",
      element: <ForgotPassPage />,
    },
    {
      path: "/verify",
      element: <VerifyEmailNumberPage />,
    },
    {
      path: "/resetpass",
      element: <ResetPassPage />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
