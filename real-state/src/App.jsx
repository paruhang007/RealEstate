import LoginPage from "./assets/pages/LoginPage";
import SignUpPage from "./assets/pages/SignUpPage";
import ForgotPassPage from "./assets/pages/ForgotPassPage";
import VerifyEmailNumberPage from "./assets/pages/VerifyEmailNumberPage";
import ResetPassPage from "./assets/pages/ResetPassPage";
import HomePage from "./assets/pages/HomePage";
import Navbar from "./assets/components/Dashboard/Navbar";

import React from "react";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider
} from "react-router-dom";


const App = () => {

  const routes = createBrowserRouter(
    [
      { element: <Navbar/>, 
       children: [
        {
          path: "/",
          element: <HomePage/>
        },
        {
          // all the other routes the user can navigate to like about us, contact us, etc.
        }
      ] 
    },
    {
      path: "/login",
      element: <LoginPage/> 
    },
    {
      path: "/signup",
      element: <SignUpPage/>
    },
    {
      path: "/forpass",
      element: <ForgotPassPage/>
    },
    {
      path: "/verify",
      element: <VerifyEmailNumberPage/>
    },
    {
      path: "/resetpass",
      element: <ResetPassPage/>
    }
    
      
   ]
  )

  // <div className="App">
  //     <Routes>
  //       <Route path="/" element={<HomePage/>}/>
  //       <Route path="/login" element={<LoginPage/>}/>
  //       <Route path="/signup" element={<SignUpPage/>}/>
  //       <Route path="/forpass" element={<ForgotPassPage/>}/>
  //       <Route path="/verify" element={<VerifyEmailNumberPage/>}/>
  //       <Route path="/resetpass" element={<ResetPassPage/>}/>
  //     </Routes>
  //   </div>
  return (
    <RouterProvider router={routes}/>
  );
}

export default App
