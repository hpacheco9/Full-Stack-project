import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Menu from "./pages/Menu.jsx";
import Index from "./pages/Index.jsx";
import styled from "styled-components";
import { AuthContext } from "./Context.js";
import { useEffect, useState } from "react";
import { get } from "./services/Auth.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Question from "./pages/Pergunta_m1.jsx";
import dlore from "./assets/images/dlore.png";
import Regist from "./pages/Regist.jsx";

const MainComponent = styled.div`
  background-color: #282c34;
  color: white;
`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    get()
      .then((u) => {
        if (u) {
          setUser(u);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [setUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/pergunta",
      element: <Question source={dlore} title={"Que skin é esta?"} />,
    },
    {
      path: "/registo",
      element: <Regist />,
    },
  ]);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      <MainComponent>
        <RouterProvider router={router} />
      </MainComponent>
    </AuthContext.Provider>
  );
}

export default App;
