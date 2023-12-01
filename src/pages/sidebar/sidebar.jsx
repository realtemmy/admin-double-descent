import { Link } from "react-router-dom";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ListBulletIcon,
  ViewColumnsIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const sidebar = () => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 fixe">
      <div className="mb-2 flex items-center gap-4 p-4 pb-2">
        <img src="/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Double decent
        </Typography>
      </div>
      <List></List>

      <List>
        <Link to="/">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/orders">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Order
            <ListItemSuffix>
              <Chip
                // Change value here dynamically
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link to="/category">
          <ListItem>
            <ListItemPrefix>
              <ListBulletIcon className="h-5 w-5" />
            </ListItemPrefix>
            Categories
          </ListItem>
        </Link>
        <Link to="/sections">
          <ListItem>
            <ListItemPrefix>
              <ViewColumnsIcon className="h-5 w-5" />
            </ListItemPrefix>
            Section
          </ListItem>
        </Link>
        <Link to="/products">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Products
          </ListItem>
        </Link>
        <Link to="/customers">
          <ListItem>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Customers
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default sidebar;

// // import "./sidebar.scss";

// const Sidebar = () => {
//   return (
//       <div className="sidebar-container">
//         <div className="container">
//           <div className="header">
//             <div className="logo">Double Descent</div>
//             <div className="hamburger">
//               <i className="fa-solid fa-bars"></i>
//             </div>
//           </div>
//           <section>
//             <div className="dashboard active">
//               <Link to="/" className="nav-link">Dashboard</Link>
//             </div>
//             <div className="orders">
//               <Link to="/order" className="nav-link">Orders</Link>
//             </div>
//             <div className="categories">
//               <Link to="/category" className="nav-link">Categories</Link>
//             </div>
//             <div className="section">
//               <Link to="/section" className="nav-link">Sections</Link>
//             </div>
//             <div className="product">
//               <Link to="/product" className="nav-link">Products</Link>
//             </div>
//             <div className="customers">
//               <Link className="nav-link">Customers</Link>
//             </div>
//           </section>
//         </div>
//       </div>
//   );
// };

// export default Sidebar;
