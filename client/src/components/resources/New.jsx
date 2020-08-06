import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const New = function () {

  const [inputs, setInputs] = useState({
    gameTitle: '',
    playtime: '',
    installationStatus: 'NOTINSTALLED'
  });

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/resources', inputs);

      if (resp.status === 200)  {
        toast("The game was created successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue creating the game", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue creating the game", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/resources"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>New Game</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="gameTitle"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Play Time:</Form.Label>
            <Form.Control
              name="playtime"
              onChange={handleInputChange}
              value={inputs.content}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Installation status:</Form.Label>
            <Form.Control
              as="select"
              name="installationStatus"
              onChange={handleInputChange}
              defaultValue={inputs.status || 'NOTINSTALLED'}
            >
              <option value="NOTINSTALLED">Not Installed</option>
              <option value="INSTALLED">Installed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Add</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default New;
