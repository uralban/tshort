import React from 'react';
import useRoutes from './routes';
import useTopbar from './components/bars/topbar';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/bars/Navbar";

function App() {
  const userStatus = (localStorage.getItem('token')) ? true : false;  
  const routes = useRoutes(userStatus);
  const topbar = useTopbar(userStatus);

  return (
    <div className="container">
      <div className="row">
        <Router>
          {topbar}
          <Navbar />
          {routes}
        </Router>
      </div>
    </div>
  );
}

export default App;
