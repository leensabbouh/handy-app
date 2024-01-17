import Navbar from "./components/Navbar";
import Login from "./components/user/Login";
import Notification from "./components/Notification"

function App() {
  
  return (
    <div>
      <Notification/>
      <Login/>
      <Navbar/>
    </div>
  );
}

export default App;
