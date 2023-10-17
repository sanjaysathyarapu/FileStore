import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        {/* <nav className="navbar navbar-expand navbar-dark bg-primary">
          <Link to={"/"} className="navbar-brand">
            FileStore 
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home 
              </Link>
            </li>


            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav> */}
        <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: "#808080", fontFamily: "Verdana, sans-serif" }}>
  <Link to={"/"} className="navbar-brand" style={{ color: "#ffffff" }}>
    FileStore
  </Link>
  <div className="navbar-nav mr-auto">
    <li className="nav-item">
      <Link to={"/home"} className="nav-link" style={{ color: "#ffffff" }}>
        Home
      </Link>
    </li>

    {showAdminBoard && (
      <li className="nav-item">
        <Link to={"/admin"} className="nav-link" style={{ color: "#ffffff" }}>
          Admin Board
        </Link>
      </li>
    )}
  </div>

  {currentUser ? (
    <div className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to={"/profile"} className="nav-link" style={{ color: "#ffffff" }}>
          {currentUser.username}
        </Link>
      </li>
      <li className="nav-item">
        <a href="/login" className="nav-link" style={{ color: "#ffffff" }} onClick={this.logOut}>
          LogOut
        </a>
      </li>
    </div>
  ) : (
    <div className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to={"/login"} className="nav-link" style={{ color: "#ffffff" }}>
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link to={"/register"} className="nav-link" style={{ color: "#ffffff" }}>
          Sign Up
        </Link>
      </li>
    </div>
  )}
</nav>


        <div className="container mt-3">
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        <AuthVerify logOut={this.logOut}/>
      </div>
    );
  }
}

export default App;