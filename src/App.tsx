import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Agendamento from "./pages/Agendamento";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import PrivateRoute from "./components/PrivateRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route 
          path="/" 
          element={<Home />} 
        />


        <Route 
          path="/agendamento" 
          element={<Agendamento />} 
        />


        <Route 
          path="/login" 
          element={<Login />} 
        />


        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;