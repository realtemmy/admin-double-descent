import { Link } from "react-router-dom";

import "./sidebar.scss";

const Sidebar = () => {
  return (
      <div className="sidebar-container">
        <div className="container">
          <div className="header">
            <div className="logo">Double Descent</div>
            <div className="hamburger">=</div>
          </div>
          <section>
            <div className="dashboard active">
              <Link to="/" className="nav-link">Dashboard</Link>
            </div>
            <div className="orders">
              <Link className="nav-link">Orders</Link>
            </div>
            <div className="categories">
              <Link to="/category" className="nav-link">Categories</Link>
            </div>
            <div className="section">
              <Link className="nav-link">Sections</Link>
            </div>
            <div className="product">
              <Link className="nav-link">Products</Link>
            </div>
            <div className="customers">
              <Link className="nav-link">Customers</Link>
            </div>
          </section>
        </div>
      </div>
  );
};

export default Sidebar;
