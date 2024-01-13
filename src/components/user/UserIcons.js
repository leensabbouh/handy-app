
import { useValue } from "../../context/ContextProvider"
import { useState } from "react"
import useCheckToken from "../hooks/useCheckToken"
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Avatar } from "@mui/material";
 

const UserIcons=()=>{
  useCheckToken();
   const [anchorUserMenu,setAnchorUserMenu]=useState(null)
   
const {dispatch,state:{currentUser}}=useValue()

    return(
        <Menu>
        <MenuHandler>
        <Button onClick={(e)=> setAnchorUserMenu(e.currentTarget)}>
           <Avatar
      size="lg"
      src={currentUser?.photoURL} alt={currentUser?.name}
      className="border border-blue-500 shadow-xl shadow-blue-500/20 ring-4 ring-blue-400/30 bg-transparent"
    >{currentUser?.name?.charAt(0).toUpperCase()}</Avatar>
        </Button>
        </MenuHandler>
        <MenuList className="bg-black shadow-blue-500/20 border-blue-500 rounded z-20 py-2">
          <MenuItem className="flex items-center px-2 pb-2 text-white hover:bg-gray-900 hover:border-none hover:outline-none" > <IoSettingsOutline />
          <span className="px-2">Profile</span></MenuItem>
          <MenuItem className="flex items-center px-2 text-white  hover:bg-gray-900 hover:border-none hover:outline-none" onClick={()=>dispatch({type:'UPDATE_USER', payload:null})}><CiLogout /> <span className="px-2">LogOut</span></MenuItem>
        </MenuList>
      </Menu>
    )
}
export default UserIcons