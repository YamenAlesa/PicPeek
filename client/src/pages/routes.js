import HomePage from "./homePage";
import LoginPage from "./loginPage";
import ProfilePage from "./profilePage";
import RegisterPage from "./RegisterPage";

export const routes = [
  {
    name: "HomePage",
    element: <HomePage />,
    path: "/Home",
  },
  {
    name: "LoginPage",
    element: <LoginPage />,
    path: "/auth/login",
  },
  {
    name: "RegisterPage",
    element: <RegisterPage />,
    path: "/auth/register",
  },
  {
    name: "ProfilePage",
    element: <ProfilePage />,
    path: "/user/profile",
  },
];
