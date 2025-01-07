import HomePage from "./homePage";
import LoginPage from "./loginPage";
import ProfilePage from "./profilePage";
import RegisterPage from "./RegisterPage";
import SearchPage from "./searchPage"; // Import the new SearchPage
import UserDetailPage from "./userDetailPage"; // Import the new UserDetailPage

export const routes = [
  {
    name: "HomePage",
    element: <HomePage />,
    path: "/home",
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
  {
    name: "SearchPage", // New route for SearchPage
    element: <SearchPage />,
    path: "/search",
  },
  {
    name: "UserDetailPage", // New route for UserDetailPage
    element: <UserDetailPage />,
    path: "/user/profile/:username", // Dynamic route for user profiles
  },
];
