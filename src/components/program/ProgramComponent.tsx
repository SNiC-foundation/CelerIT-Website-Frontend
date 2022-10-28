import React, { useEffect } from 'react';
import {
  Box, Grid, Paper, styled, Typography,
} from '@mui/material';
import {
  Client, ProgramPart,
} from '../../clients/server.generated';
import ActivityComponent, { ActivityWithParticipantAmount } from './ActivityComponent';
import PageHeader from '../layout/PageHeader';
import { AuthContext } from '../../auth/AuthContextProvider';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  width: '100%',
}));

function ProgramComponent() {
  const [activities, setActivities] = React.useState<ActivityWithParticipantAmount[] | null>(null);
  const [programParts, setProgramParts] = React.useState<ProgramPart[] | null>(null);

  const authContext = React.useContext(AuthContext);
  const { user } = authContext;

  const getProgram = () => {
    const client = new Client();

    async function fetchActivities() {
      const res = await client.getAllActivities();
      setActivities(res.map((act) => Object.assign(act.activity, {
        nrOfSubscribers: act.nrOfSubscribers,
      })));
    }

    async function fetchProgramParts() {
      const res = await client.getAllProgramParts();
      // TODO: fix something for when timeslots are overlapping (or just don't)
      res.sort((a, b) => ((a.beginTime > b.beginTime) ? 1 : -1));
      setProgramParts(res);
    }

    fetchProgramParts();
    fetchActivities();
  };

  useEffect(() => {
    getProgram();
  }, []);

  if (activities != null && programParts != null) {
    const locations = Array.from(new Set(activities.map((element) => element.location)));

    const activitiesHtml = programParts.map((programPart) => {
      const activitiesInProgramPart = activities
        .filter((activity) => activity.programPartId === programPart.id);

      return (
        <>
          <Grid item xs={1}>
            <Item sx={(theme) => ({
              backgroundColor: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            })}
            >
              <Typography variant="h4" sx={{ color: 'white' }}>
                {programPart.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                {programPart.beginTime.getUTCHours().toString().padStart(2, '0')}
                :
                {programPart.beginTime.getUTCMinutes().toString().padStart(2, '0')}
                -
                {programPart.endTime.getUTCHours().toString().padStart(2, '0')}
                :
                {programPart.endTime.getUTCMinutes().toString().padStart(2, '0')}
              </Typography>
            </Item>
          </Grid>

          {locations.map((location) => {
            const activity = activitiesInProgramPart.filter((ac) => ac.location === location);
            if (activity[0] === undefined) {
              return (
                <Grid item xs={1} sx={{ display: { xs: 'none', xl: 'flex' } }}>
                  {/* Adds an empty item for the table-view, but it is hidden on mobile */}
                </Grid>
              );
            }
            return (
              <Grid item xs={1}>
                <Item>
                  <ActivityComponent
                    activity={activity[0]}
                    user={user}
                    getProgram={getProgram}
                  />
                </Item>
              </Grid>
            );
          })}
        </>
      );
    });

    const locationsHtml = locations.map((location) => (
      <Grid item xs={1} sx={{ alignSelf: 'flex-end' }}>
        <Box>
          <Item sx={{ backgroundColor: '#072b4e' }}>
            <Typography variant="h4" sx={{ color: 'white' }}>{location}</Typography>
          </Item>
        </Box>
      </Grid>
    ));

    return (
      <>
        <Box sx={{ textAlign: 'center' }}>
          <PageHeader
            title="Program"
            text="Below you may find the full program for SNiC 2022."
            lines={1}
            extraMargin={4}
          />
        </Box>
        <Grid container direction="row" spacing={2} columns={locations.length + 1} sx={{ display: { xs: 'none', xl: 'flex' } }} alignItems="stretch">
          {/* This is an empty box to make the table look nicer */}
          <Grid item xs={1} />
          {locationsHtml}
          {activitiesHtml}
        </Grid>

        <Grid container direction="row" spacing={2} columns={1} sx={{ display: { xs: 'flex', xl: 'none' } }}>
          {activitiesHtml}
        </Grid>
      </>
    );
  }

  return (
    // TODO: make a nice component with an animated loading thingy
    <Typography>Loading</Typography>
  );
}

export default ProgramComponent;
