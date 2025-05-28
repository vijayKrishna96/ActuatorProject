import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Mainlayout from "./layout/Mainlayout";
import Dashboard from "./layout/Dashboard";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
