import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id; // found in docs for react router

  const [inputs, setInputs] = useState({
    gameTitle: '',
    playtime: '',
    installationStatus: 'NOTINSTALLED'
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const resourceResp = await Axios.get(`/api/resources/${id}`);
      console.log(resourceResp);
      if (resourceResp.status === 200) setInputs(resourceResp.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/resources/update', inputs);

      if (resp.status === 200)  {
        toast("The resource was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the resource", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the resource", {
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
        <h1>Edit Game</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Rename game</Form.Label>
            <Form.Control
              name="gameTitle"
              onChange={handleInputChange}
              value={inputs.gameTitle}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Play Time:</Form.Label>
            <Form.Control
              name="playtime"
              onChange={handleInputChange}
              value={inputs.playtime}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Installation status:</Form.Label>
            <Form.Control
              as="select"
              name="installationStatus"
              onChange={handleInputChange}
              defaultValue={inputs.installationStatus || 'NOTINSTALLED'}
            >
              <option value="NOTINSTALLED">Not Installed</option>
              <option value="INSTALLED">Installed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;
