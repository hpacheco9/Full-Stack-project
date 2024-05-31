import "./assets/css/App.css";
import Home from "./pages/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter({
    path: "/",
    element: <Home />,
  });
  return <RouterProvider router={router} />;
}

export default App;
