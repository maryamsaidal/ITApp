import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateUser } from "../Features/UserSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidations } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
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
const UpdateUser=()=>{
const {user_email,user_name,user_password}=useParams();
const [name,setName]=useState(user_name);
const [email,setEmail]=useState(user_email);
const [password,setPassword]=useState(user_password);
const [confirmPassword,setConfirmPassword]=useState(user_password);
const {
    register,
    handleSubmit:submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidations),
  });

const dispatch=useDispatch();
const handleUpdate=()=>{
    const userData = {
        name: name,
        email: email,
        password:password,
      };
      dispatch(updateUser(userData));
}
return(
    <Container fluid>
      <Row className="formrow">
        <Col className="columndiv1" lg="6">
          {/* Execute first the submitForm function and if validation is good execute the handleSubmit function */}
          <Form className="div-form" onSubmit={submitForm(handleUpdate)}>
            <div className="appTitle"></div>
            <section className="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name..."
                  value={name}
                  {...register("name")} 
                  onChange={(e) => setName(e.target.value)} 
                  
                />
                <p className="error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  value={email}
                  {...register("email")}
                  onChange={(e) => setEmail(e.target.value)} 
                  
                />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password..."
                  value={password}
                  {...register("password")} 
                  onChange={(e) => setPassword(e.target.value)} 
                  
                />
                <p className="error">{errors.password?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password..."
                  value={confirmPassword}
                  {...register("confirmPassword")}
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                   
                />
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>
              <Button color="primary" className="button">
                UpdateUser
              </Button>
            </section>
          </Form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
      </Container>
);
}
export default UpdateUser;