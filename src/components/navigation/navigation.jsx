import { Outlet } from "react-router";

import "./navigation.scss"

const Navigation = () => {
  return (
    <>
      <div className="navigation-container">
        <nav>
          <div className="search">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
            />
            <button className="button">Search</button>
          </div>
          <div className="nav-info">
            <div className="notification">X</div>
            <div className="user">User</div>
          </div>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default Navigation;
