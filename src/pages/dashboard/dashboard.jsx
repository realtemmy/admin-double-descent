import { Outlet } from "react-router"

const Dashboard = () => {
  return (
    <div>
        <Outlet />
        <span>OMO!!!!</span>
      Home page
    </div>
  )
}

export default Dashboard
