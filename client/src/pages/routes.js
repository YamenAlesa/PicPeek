import HomePage from "./homePage";
import LoginPage from "./loginPage";
import ProfilePage from "./profilePage";
import RegisterPage from "./RegisterPage";
import SearchPage from "./searchPage"; 
import UserDetailPage from "./userDetailPage"; 

export const routes = [
  {
    name: "HomePage",
    element: <HomePage />,
    path: "/home",
  },
  {
    name: "LoginPage",
    element: <LoginPage />,
    path: "/login",
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
  {
    name: "SearchPage", 
    element: <SearchPage />,
    path: "/search",
  },
  {
    name: "UserDetailPage", 
    element: <UserDetailPage />,
    path: "/user/profile/:username", 
  },
];
