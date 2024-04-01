import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import BookDetails from "./pages/bookDetails";
import { PublicRoutes, PrivateRoutes } from "./utils/protectRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="*" element={<Navigate to="/" />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/book" element={<BookDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
