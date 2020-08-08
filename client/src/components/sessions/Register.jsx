import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setUser}) => {
  const [inputs, setInputs] = useState({
		firstName: '',
		lastName: '',
    email: '',
		emailConfirmation: '',
    password: '',
		passwordConfirmation: ''
  });

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/users', inputs);

      if (resp.status === 200) {
        setUser(resp.data.user);
        toast('You have registered successfully', {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue during sign-up. Please check your credentials", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue during sign-up. Please check your credentials", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = event => {
    event.persist();

    const {name, value} = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) {
    return (<Redirect to="/resources"/>);
  }

  return (
    <Container className="my-5">
      <header>
        <h1>Register</h1>
      </header>

      <hr/>

      <Form onSubmit={handleSubmit}>
				<Form.Group>
					<label htmlFor="firstName">First Name:</label>
					<Form.Control type="text" name="firstName"  onChange={handleInputChange} value={inputs.firstName}></Form.Control>
				</Form.Group>
				<Form.Group>
					<label htmlFor="lastName">Last Name:</label>
					<Form.Control type="text" name="lastName"  onChange={handleInputChange} value={inputs.lastName}></Form.Control>
				</Form.Group>
        <Form.Group>
          <label htmlFor="email">Email:</label>
          <Form.Control type="email" name="email" onChange={handleInputChange} value={inputs.email}/>
        </Form.Group>
				<Form.Group>
					<label htmlFor="emailConfirmation">Email Confirmation:</label>
					<Form.Control type="email" name="emailConfirmation" onChange={handleInputChange} value={inputs.emailConfirmation}/>
				</Form.Group>
        <Form.Group>
          <label htmlFor="password">Password:</label>
          <Form.Control type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
        </Form.Group>
				<Form.Group>
					<label htmlFor="passwordConfirmation">Password Confirmation:</label>
					<Form.Control type="password" name="passwordConfirmation" onChange={handleInputChange} value={inputs.passwordConfirmation}/>
				</Form.Group>

        <Form.Group>
          <button className="btn btn-primary">Register</button>
        </Form.Group>
      </Form>

    </Container>
  );
};

export default Login;
