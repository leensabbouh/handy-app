import UserIcons from "Components/user/UserIcons";
import { useValue } from "Context/ContextProvider";

const Navbar = () => {
    const {
        currentUser,
        dispatch
    } = useValue()
    return (
        <nav className="flex justify-between items-center w-full h-20 md:flex-nowrap bg-black  fixed z-10">
            <div className="logo mx-5 md:mx-20 text-white font-bold">
                <h2>HANDY APP</h2>
            </div>
            <div className="block  font-bold mx-5 md:mx-20 md:mt-0 ml-auto  text-white">
                <ul className="flex md:flex md:justify-end md:items-center md:w-full">
                    {!currentUser ? (
                        <button color="inherit"

                                onClick={() => dispatch({type: 'OPEN_LOGIN'})}>Login</button>

                    ) : (
                        <UserIcons/>
                    )}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
