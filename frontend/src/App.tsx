import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

import { ErrorPage, ProtectedRoute } from "./pages/Route";

import { Index as AuthPage } from "./pages/auth/Index";

import { Index as ChatPage } from "./components/chat/Index";

import Chat from "./pages/Chat";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import ChatBox from "./components/chat/ChatBox";

const App = () => {
  const { user } = useAuth();

  //@credit https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
      errorElement: <ErrorPage />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Chat />,
          children: [
            {
              path: "/",
              element: <ChatPage />,
              children: [
                {
                  path: "/:chatId",
                  element: <ChatBox />,
                },
              ],
            },
            {
              path: "/profile",
              element: (
                <div className=" bg-white mt-2 h-full grid place-items-center">
                  User Profile
                </div>
              ),
            },
          ],
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth",
      element: <AuthPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/auth",
          element: <Login />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
      ],
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(user ? routesForAuthenticatedOnly : []),
    ...routesForNotAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return (
    <ChatContextProvider user={user}>
      <RouterProvider router={router} />
    </ChatContextProvider>
  );
};

export default App;
