import React, { useEffect } from 'react';
import {
  Grid, Paper, styled, Typography,
} from '@mui/material';
import ActivityComponent from './ActivityComponent';
import { Activity, Client } from '../clients/server.generated';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ProgramComponent() {
  const [data, setData] = React.useState<Activity[] | null>(null);
  const client = new Client();

  useEffect(() => {
    async function fetchData() {
      const res = await client.getAllActivities();
      setData(res);
    }
    fetchData();
  }, [setData]); // re-render once when data is loaded

  if (data != null) {
    return (
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <Item>
            <ActivityComponent title="Opening" location="Room 1" startTime={new Date()} endTime={new Date()} description="Plenary opening of the day" />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 1.1" location="Room 1" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 1.2" location="Room 2" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 1.3" location="Room 3" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Speeddates 1" location="Speeddates room" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <ActivityComponent title="Lunch" location="Foyer" startTime={new Date()} endTime={new Date()} description="Lekker smikkelen" />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 2.1" location="Room 1" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 2.2" location="Room 2" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 2.3" location="Room 3" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Speeddates 2" location="Speeddates room" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 3.1" location="Room 1" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 3.2" location="Room 2" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Parallel 3.3" location="Room 3" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <ActivityComponent title="Speeddates 3" location="Speeddates room" startTime={new Date()} endTime={new Date()} />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <ActivityComponent title="Dinner" location="Foyer" startTime={new Date()} endTime={new Date()} description="Lekker smikkelen" />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <ActivityComponent title="Borrel" location="Foyer" startTime={new Date()} endTime={new Date()} description="Lekker smikkelen" />
          </Item>
        </Grid>
      </Grid>
    );
  }

  return (
    // TODO: make a nice component with an animated loading thingy
    <Typography>Loading</Typography>
  );
}

export default ProgramComponent;
