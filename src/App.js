import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./Vue";
import Horaire from "./Vue/Horaire";
import ForgetPasswoord from "./Vue/Forgetpaddword";
import { Routes } from "react-router-dom/dist/umd/react-router-dom.development";
import SignUp from "./Vue/SignUp";
import Map from "./Vue/Maps";

import StripeContainer from "./Vue/StripeContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/horaire" element={<Horaire />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/forgotPassword" element={<ForgetPasswoord />} />
        <Route path="/maps" element={<Map />} />
        <Route path="payment" element={<StripeContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
