import LoginPage from "./assets/pages/LoginPage";
import SignUpPage from "./assets/pages/SignUpPage";
import ForgotPassPage from "./assets/pages/ForgotPassPage";
import VerifyEmailNumberPage from "./assets/pages/VerifyEmailNumberPage";
import ResetPassPage from "./assets/pages/ResetPassPage";
import HomePage from "./assets/pages/HomePage";
import Navbar from "./assets/components/Dashboard/Navbar";
import UnitConverter from "./assets/components/Dashboard/UnitConverter";
import EmiCalculator from "./assets/components/Dashboard/EmiCalculator";
import AddProperty from "./assets/components/UserDashboard/AddProperty";
import UserProfile from "./assets/components/UserDashboard/UserProfile";
import ChangePassword from "./assets/components/UserDashboard/ChangePassword";
import Favourite from "./assets/components/UserDashboard/Favourite";
import SearchProp from "./assets/components/Dashboard/SearchProp";
import Detail from "./assets/components/Dashboard/Detail";
import Sidebar from "./assets/components/UserDashboard/SideBar";
import UseDashPage from "./assets/pages/UserDashPage";
import MyProperties from "./assets/components/UserDashboard/MyProperties";
import LoginAdminPage from "./assets/Admin/LoginAdminPage";
import DashAdmin from "./assets/Admin/DashAdmin";
import AllUsers from "./assets/Admin/Dashboard/AllUsers";

import React from "react";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";


const App = () => {
  const routes = createBrowserRouter([
    // routing for the dashboard
    {
      element: <Navbar />,

      // all the routes the user can navigate to
      children: [
        {
          path: "/",
          element: <HomePage />,
        },

        {
          path: "/unitconvert",
          element: <UnitConverter />,
        },
        {
          path: "/emical",
          element: <EmiCalculator />,
        },

        // routing for the user dashboard
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
            {
              path: "/favourite",
              element: <Favourite />,
            },
            {
              path: "/myproperties",
              element: <MyProperties />,
            },

          ],
        },

        {
          path: "/userprofile",
          element: <AddProperty />,
        },
        {
          path: "/search",
          element: <SearchProp />,
        },
        {
          path: "/detail",
          element: <Detail />,
        },
      ],
    },

    // routing for the login, signup, forgot password, verify email, reset password for user
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

    // routing for the admin dashboard
    {
      path: "/loginadmin",
      element: <LoginAdminPage />,
    },
    {
      path: "/admindash",
      element: <DashAdmin />,
      children: [
        {
          path: "allusers",
          element: <AllUsers />,
        },
      ],

    },

  ]);

  return <RouterProvider router={routes} />;
};

export default App;
