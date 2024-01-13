import Navbar from "./components/Navbar";
import Login from "./components/user/Login";
import Notification from "./components/Notification"
import Loading from "./components/Loading";

function App() {
  
  return (
    <div>
      <Loading/>
      <Notification/>
      <Login/>
      <Navbar/>
    </div>
  );
}

export default App;
