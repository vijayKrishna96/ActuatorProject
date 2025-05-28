import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Mainlayout from "./layout/Mainlayout";
import ActuatorSizing from "./components/Actuatorsizing";
import ActuatorSelector from "./components/Actuatorselector";


function App() {
   return (
    <>
      <Routes>
          <Route path="/" element={<Mainlayout />}>
          <Route index element={<ActuatorSizing />} />
          <Route path="/" element={<ActuatorSelector />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
