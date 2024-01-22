// import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Form from "./Components/Form";
import View from "./Components/View";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";


function App() {
  const [login, setLognin] = useState(false)






  return (
    <div className="App">

      <BrowserRouter>
        <NavBar 
          login={login}
          setLognin={setLognin}
        />
        <Routes>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login setLognin={setLognin} />} />

          <Route path='/form' element={<Form />} />
          <Route path='/view' element={<View />} />
          <Route path='/' element={<Home />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
