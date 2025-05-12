import user from "../Images/user.png";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import {useSelector} from "react-redux";
import Location from "./Location";
const User = () => {

const user=useSelector((state)=>state.users.user);
const picURL="http://localhost:3001/uploads/"+ user.profilePic;
const email =useSelector((state)=>state.users.user.email);
const name =useSelector((state)=>state.users.user.name);
  return (
    <div>
      
          <img src={user} className="logo"></img>
          <p>
            {name}<br></br>
            {email}<br></br>
            <Location/>
          </p>
          
    </div>
  );
};

export default User;
