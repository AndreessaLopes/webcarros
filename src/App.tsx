import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { CarDetail } from "./pages/car";
import { Dashboard } from "./pages/dashboard";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { New } from "./pages/dashboard/new";
import { Layout } from "./components/layout";
import { Private } from "./routes/Private";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/car/:id",
        element: <CarDetail />,
      },
      {
        path: "/dashboard",
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <Private>
            <New />
          </Private>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export { router };
