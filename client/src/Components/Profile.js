import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Form,FormGroup,Input,Label,Button,Container,Row,Col} from "reactstrap";
import User from './User';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchemaValidations } from "../Validations/UserValidations";
import { useNavigate } from "react-router";
import { updateUserProfile } from "../Features/UserSlice";
const Profile = () => {
  const user =useSelector((state)=>state.users.user);
  const [userName,setUserName]=useState(user.name);
  const [pwd,setPwd]=useState(user.password);
  const [confirmPassword,setconfirmPassword]=useState(user.password);
  const [profilePic,setProfilePic]=useState(user.profilePic);
  const navigate=useNavigate();
  const dispatch=useDispatch();
const {
    register,
    handle:submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidations),
  });
  const handleUpdate = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
   
    
    // Prepare the user data object with the current user's email and updated details
    const userData = {
      email: user.email, // Retrieve email from the Redux store
      name: userName, // Get the updated name from the state variable
      password: pwd, // Get the updated password from the state variable
      profilePic: profilePic,
    };
    console.log(userData);
    // Dispatch the updateUserProfile action to update the user profile in the Redux store
    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    // Navigate back to the profile page after the update is completed
    navigate("/profile");
  };
const handleFileChange=(event)=>{
  const upoadFile =event.target.files[0];
  if(!upoadFile) alert("No  file uploaded");
  else setProfilePic(event.target.files[0]);
};
useEffect(()=>{
  if(!user.email){
    navigate("/login");
  }

})

  return (
    <Container fluid>
      <h1>Profile</h1>
      <Row>
        <Col md={2}>
        <User/>
        </Col>
        <Col md={4}>Updated Profile
        <Form onSubmit={handleUpdate}>
            <input type="file" name="profilePic" />
            <div className="appTitle"></div>
            Update Profile
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" name="name" placeholder="Name..." 
              type="text"
              value={userName}
              {...register("name",{
                onchange:(e)=>{
                  setUserName(e.target.value);
                },
              })}
              />
            </FormGroup>
             <FormGroup>
               <Label for="password">Password</Label>
               <Input
                 id="password"
                 name="password"
                 placeholder="Password..."
                 type="password"
                 value={pwd}
              {...register("password",{
                onchange:(e)=>{
                  setPwd(e.target.value);
                },
              })}
               />
             </FormGroup>
             <FormGroup>
               <Label for="confirmPassword">Confirm Password</Label>
               <Input
                 id="confirmPassword "
                 name="confirmPassword"
                 placeholder="Confirm Password..."
                 type="password"
                 value={confirmPassword}
              {...register("confirmPassword",{
                onchange:(e)=>{
                  setconfirmPassword(e.target.value);
                },
              })}
               />
             </FormGroup>
             <FormGroup>
               <Button color="primary" className="button" type="submit">
                 Update Profile
               </Button>
             </FormGroup>
           </Form>
 
        
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
