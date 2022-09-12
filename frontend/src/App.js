import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
// import { ToastContainer, Zoom } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/login" component={LoginScreen}></Route>
            <Route path="/admin/register" component={RegisterScreen}></Route>
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route path="/admin/userlist" component={UserListScreen}></Route>
            <Route
              path="/admin/user/:id/edit"
              component={UserEditScreen}
            ></Route>
            <Route element={NotFoundScreen}></Route>
          </Switch>
        </Container>
      </main>
    </Router>
  );
};

export default App;
