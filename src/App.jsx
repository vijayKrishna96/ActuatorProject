import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Mainlayout from "./layout/Mainlayout";
import Dashboard from "./layout/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./config/AuthComtext";
import Login from "./components/Login";


function App() {

  const { token } = useContext(AuthContext)

  console.log(token);

  return (
    <>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          {
            token ? (
              <>
                <Route path="/" element={<Dashboard />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
              </>
            )
          }
        </Route>
      </Routes>
    </>
  );
}

export default App;
