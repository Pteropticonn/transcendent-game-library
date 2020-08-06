import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import ScriptTag from 'react-script-tag';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const section = {
  height: "100%",
  paddingTop: 5,
  backgroundColor: "#fff"
};

const useStyles = makeStyles( (theme) =>({
 grid: {
   padding: "2%",
   width: '100%',
   height: '100%',
   margin: '0px'
 },
 paper: {
   height: "60%",
   padding: theme.spacing(2),
   textAlign: 'center',
   color: theme.palette.text.secondary,
   background: theme.palette.success.light
 },
 header: {
   height: '20%',
   textAlign: 'center'
 }
}));

const Index = function ({user}) {
  const classes = useStyles();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      await getResources();
    })();
  }, []);

  const getResources = async () => {
    const resourcesResp = await Axios.get('/api/resources');
    if (resourcesResp.status === 200) setResources(resourcesResp.data);
  };

  const deleteResource = async resource => {
    try {
      const resp = await Axios.post('/api/resources/delete', {
        id: resource._id
      });

      if (resp.status === 200) toast("The game was deleted successfully", {type: toast.TYPE.SUCCESS});

      await getResources();
    } catch (error) {
      toast("There was an error deleting the game", {type: toast.TYPE.ERROR});
    }
  };

  return (

      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} md={12} lg={12}>
          <h1 className={classes.header}>Game Library</h1>
        </Grid>
        {resources && resources.map((resource, i) => (

          <Grid key={i} item xs={6} md={3} lg={3}>
            <Paper className={classes.paper}>
              <h3>{resource.gameTitle}</h3>
              <hr/>
              <h4>Playtime: {resource.playtime} hours</h4>
              <hr/>
              <h5>{resource.installationStatus}</h5>

            </Paper>
            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/resources/edit",
                  state: {
                    id: resource._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteResource(resource)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </Grid>


        ))}

      </Grid>

  );

};

export default Index;
