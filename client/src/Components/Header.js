import {Navbar,Nav, NavItem, NavLink} from "reactstrap"; 
import logo from '../Images/logo.png';
import {Link,useNavigate} from "react-router-dom";
import { logout } from "../Features/UserSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handlelogout =async ()=>{
    dispatch(logout());

    await new Promise((resolve)=>setTimeout(resolve,100));
    navigate("/login");
  };
  return (
    <Navbar className="hedaer">
    <Nav>
  <NavItem>
    <Link><img src={logo}></img></Link>
  </NavItem>
  <NavItem>
    <Link to="/home">Home</Link>
  </NavItem>

  <NavItem>
    <Link to="/Profile">Profile</Link>
  </NavItem>
  <NavItem>
    <Link onClick={handlelogout}>Logout</Link>
  </NavItem>
 
</Nav>
</Navbar>


  );
};

export default Header;