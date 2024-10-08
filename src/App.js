import Home from "./screens/Home";
import Login from "./screens/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link
} from "react-router-dom";
//import "../node_modules/bootstrap/dist/css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/createUser" element={<SignUp />} />
              <Route exact path="/myOrder" element={<MyOrder />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
