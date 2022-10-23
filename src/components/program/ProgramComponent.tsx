import React, { useEffect } from 'react';
import {
  Box, Container, Grid, Paper, styled, Typography,
} from '@mui/material';
import {
  Activity, Client, ProgramPart,
} from '../../clients/server.generated';
import ActivityComponent from './ActivityComponent';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ProgramComponent() {
  const [activities, setActivities] = React.useState<Activity[] | null>(null);
  const [programParts, setProgramParts] = React.useState<ProgramPart[] | null>(null);
  const client = new Client();

  useEffect(() => {
    async function fetchActivities() {
      const res = await client.getAllActivities();
      setActivities(res.map((act) => act.activity));
    }

    async function fetchProgramParts() {
      const res = await client.getAllProgramParts();
      // TODO: fix something for when timeslots are overlapping (or just don't)
      res.sort((a, b) => ((a.beginTime > b.beginTime) ? 1 : -1));
      setProgramParts(res);
    }

    fetchProgramParts();
    fetchActivities();
  }, []);

  if (activities != null && programParts != null) {
    const locations = Array.from(new Set(activities.map((element) => element.location)));

    const activitiesHtml = programParts.map((programPart) => {
      const activitiesInProgramPart = activities
        .filter((activity) => activity.programPartId === programPart.id);

      return (
        <>
          <Grid item xs={1}>
            <Item sx={{ backgroundColor: '#df421d' }}>
              <h1 style={{ color: '#ffffff' }}>{programPart.name}</h1>
            </Item>
          </Grid>

          {locations.map((location) => {
            const activity = activitiesInProgramPart.filter((ac) => ac.location === location);
            if (activity[0] === undefined) {
              return (
                <Grid item xs={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {/* Adds an empty item for the table-view, but it is hidden on mobile */}
                </Grid>
              );
            }
            return (
              <Grid item xs={1}>
                <Item>
                  <ActivityComponent
                    title={activity[0].name}
                    location={activity[0].location}
                    startTime={activity[0].programPart.beginTime}
                    endTime={activity[0].programPart.endTime}
                    description={activity[0].description}
                  />
                </Item>
              </Grid>
            );
          })}
        </>
      );
    });

    const locationsHtml = locations.map((location) => (
      <Grid item xs={1}>
        <Box>
          <Item sx={{ backgroundColor: '#df421d' }}>
            <h1 style={{ color: '#ffffff' }}>{location}</h1>
          </Item>
        </Box>
      </Grid>
    ));

    return (
      // TODO: fix the blocks such that they are all the same length
      <Container maxWidth="xl">
        <Grid container direction="row" spacing={2} columns={locations.length + 1} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
          {/* This is an empty box to make the table look nicer */}
          <Grid item xs={1} />
          {locationsHtml}
          {activitiesHtml}
        </Grid>

        <Grid container direction="row" spacing={2} columns={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
          {activitiesHtml}
        </Grid>
      </Container>
    );
  }

  return (
    // TODO: make a nice component with an animated loading thingy
    <Typography>Loading</Typography>
  );
}

export default ProgramComponent;
