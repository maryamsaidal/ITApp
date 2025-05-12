
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Footer from "./Components/Footer";
import {Container,Row,Col } from "reactstrap";
import Login from"./Components/Login";
import Register from"./Components/Register";
import  UpdateUser  from "./Components/UpdateUser";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useSelector } from "react-redux";
const App = () => {
  const email=useSelector((state)=>state.users.user.email);
  return (
    <>
      <Container fluid>
        <Router>
          <Row>
            {email ?(
              <>
               <Header/>
              </>
            ):null}
            
          </Row>
          <Row>
            <Routes>
              <Route path="/home" element={<Home/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/Register" element={<Register/>}></Route>
              <Route path="/Profile" element={<Profile/>}></Route>
              <Route path="/update/:user_email/:user_name/:user_password" element={<UpdateUser/>}></Route>
            </Routes>
          </Row>
          <Row>
            {email ?(
              <>
              <Footer/>
              </>
            ):null}
           
          </Row>
        </Router>

      </Container>
    </>
  );
};

export default App;
