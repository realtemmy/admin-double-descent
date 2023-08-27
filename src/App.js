import Home from "./pages/home/home";

import Sidebar from "./pages/sidebar/sidebar";


function App() {
  return (
    <div className="d-flex mx-1">
      <div className="col-3">
        <Sidebar />
      </div>
      <div className="col-9">
        <Home />
      </div>
    </div>
  );
}

export default App;
