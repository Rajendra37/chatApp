import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./header.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
  let user=JSON.parse(sessionStorage.getItem('userData')!)
  const data = useSelector((logindata: any) => logindata.UserReducer.isLogin);
  const renderLinks = () => {
    if (data == false) {
      return [];
    } else {
      return [
        <>
          <form className="form-inline my-2 my-lg-0 div-from">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn my-2 my-sm-0 bg-light" type="submit">
              Search
            </button>
          </form>
        

          <li className="nav-item">
            <NavLink to="/home" className="nav-link text-light mr-sm-2">
             Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/chat" className="nav-link text-light mr-sm-2">
             Chat
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/profile" className="nav-link text-light mr-sm-2">
            {user.name}
            </NavLink>
          </li>
        
        </>,
      ];
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="Nav-div">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand text-light" href="#">
            ChaTApp
          </a>

          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">{renderLinks()}</ul>
        </div>
      </nav>
    </div>
  );
}
