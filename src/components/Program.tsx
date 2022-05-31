import React from 'react';
import { Grid, Paper, styled } from '@mui/material';
import Activity from './Activity';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Program() {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12}>
        <Item>
          <Activity title="Opening" location="Room 1" startTime={new Date()} endTime={new Date()} description="Plenary opening of the day" />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 1.1" location="Room 1" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 1.2" location="Room 2" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 1.3" location="Room 3" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Speeddates 1" location="Speeddates room" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Activity title="Lunch" location="Foyer" startTime={new Date()} endTime={new Date()} description="Lekker smikkelen" />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 2.1" location="Room 1" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 2.2" location="Room 2" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 2.3" location="Room 3" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Speeddates 2" location="Speeddates room" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 3.1" location="Room 1" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 3.2" location="Room 2" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Parallel 3.3" location="Room 3" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Activity title="Speeddates 3" location="Speeddates room" startTime={new Date()} endTime={new Date()} />
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Activity title="Dinner" location="Foyer" startTime={new Date()} endTime={new Date()} description="Lekker smikkelen" />
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Activity title="Borrel" location="Foyer" startTime={new Date()} endTime={new Date()} description="Lekker smikkelen" />
        </Item>
      </Grid>
    </Grid>
  );
}

export default Program;
