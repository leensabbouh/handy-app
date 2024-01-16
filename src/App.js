import Navbar from "./components/Navbar";
import Notification from "./components/Notification"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Login from "./Pages/Login/Login";

function App() {

    return (
        <>
            <Navbar/>
            <div>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </div>
            <Notification/>
        </>
    );
}

export default App;
