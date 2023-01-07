import React from 'react';
import { CardContent, Paper } from '@mui/material';
import {
  Activity, ActivityParams, Client, CreateSubscribeActivityParams, ProgramPart, SubscribeActivity,
} from '../../clients/server.generated';
import AdminTable from '../../components/admin/AdminTable';
import TypographyHeader from '../../components/layout/TypographyHeader';
import { AdminPropField } from '../../components/admin/AdminProps';
import { notEmptyString, validDate } from '../../components/admin/defaultValidators';
import ActivitySpeakerModal from '../../components/admin/ActivitySpeakerModal';

function AdminProgram() {
  const [programParts, setProgramParts] = React.useState<ProgramPart[] | undefined>(undefined);
  const [activities, setActivities] = React.useState<Activity[] | undefined>(undefined);
  const [programPartsLoading, setProgramPartsLoading] = React.useState(true);
  const [activityLoading, setActivityLoading] = React.useState(true);

  const getProgramParts = () => {
    const client = new Client();
    client.getAllProgramParts()
      .then((p) => {
        setProgramParts(p);
        setProgramPartsLoading(false);
      });
  };

  const getActivities = () => {
    const client = new Client();
    client.getAllActivities()
      .then((a) => {
        setActivities(a.map((act) => act.activity));
        setActivityLoading(false);
      });
  };

  React.useEffect(() => {
    getProgramParts();
    getActivities();
  }, []);

  const pEntityColumns: AdminPropField<ProgramPart>[] = [{
    attribute: 'name',
    label: 'Name',
    width: 250,
    fieldType: 'string',
    initial: '',
    validationError: notEmptyString,
    canBeUpdated: true,
  }, {
    attribute: 'beginTime',
    label: 'Begin time',
    width: 200,
    fieldType: 'datetime',
    initial: new Date(),
    validationError: validDate,
    canBeUpdated: true,
  }, {
    attribute: 'endTime',
    label: 'End time',
    width: 200,
    fieldType: 'datetime',
    initial: new Date(),
    validationError: (value, entity) => validDate(value)
      || (entity !== undefined && value <= entity.beginTime),
    canBeUpdated: true,
  }];

  const aEntityColumns: AdminPropField<Activity, SubscribeActivity>[] = [{
    attribute: 'name',
    label: 'Name',
    width: 200,
    fieldType: 'string',
    initial: '',
    validationError: notEmptyString,
    canBeUpdated: true,
  }, {
    attribute: 'programPartId',
    label: 'Program Part',
    width: 150,
    fieldType: 'dropdown',
    initial: programParts && programParts.length > 0 ? programParts[0].id : '',
    options: programParts ? programParts.map((p) => ({
      key: p.id,
      value: p.name,
    })) : [],
    canBeUpdated: true,
  }, {
    attribute: 'location',
    label: 'Location',
    width: 100,
    fieldType: 'string',
    initial: '',
    validationError: notEmptyString,
    canBeUpdated: true,
  }, {
    attribute: 'speakers',
    label: 'Speakers',
    width: 150,
    fieldType: 'custom',
    column: {
      field: 'speakers',
    },
    canBeUpdated: false,
    getRowValue: (act) => act.speakers.map((s) => s.name).join(', '),
  }, {
    attribute: 'description',
    label: 'Description',
    width: 200,
    fieldType: 'text',
    initial: '',
    canBeUpdated: true,
  }, {
    attribute: 'recordingUrl',
    label: 'Recording URL',
    width: 200,
    fieldType: 'string',
    initial: '',
    canBeUpdated: true,
  }, {
    attribute: 'subscribe',
    label: 'Activity can be subscribed to',
    width: 0,
    fieldType: 'nested',
    initial: 1,
    canBeUpdated: true,
    fields: [{
      attribute: 'maxParticipants',
      label: 'Max participants',
      width: 150,
      fieldType: 'number',
      canBeUpdated: true,
      initial: 100,
      validationError: (value) => value === null || value === undefined || value <= 0,
    }, {
      attribute: 'subscriptionListOpenDate',
      label: 'Subscription list open',
      width: 200,
      fieldType: 'datetime',
      initial: new Date(),
      validationError: validDate,
      canBeUpdated: true,
    }, {
      attribute: 'subscriptionListCloseDate',
      label: 'Subscription list close',
      width: 200,
      fieldType: 'datetime',
      initial: new Date(),
      validationError: (value, entity) => validDate(value)
        || (entity !== undefined && value <= entity.subscriptionListOpenDate),
      canBeUpdated: true,
    }],
  }];

  const handleCreateProgramPart = async (programPart: ProgramPart) => {
    setProgramPartsLoading(true);
    const client = new Client();
    await client.createProgramPart(programPart);
    getProgramParts();
  };

  const handleUpdateProgramPart = async (programPart: ProgramPart) => {
    setProgramPartsLoading(true);
    const client = new Client();
    await client.updateProgramPart(programPart.id, {
      ...programPart,
      // @ts-ignore
      id: undefined,
    });
    getProgramParts();
  };

  const handleDeleteProgramPart = async (programPart: ProgramPart) => {
    setProgramPartsLoading(true);
    const client = new Client();
    await client.deleteProgramPart(programPart.id);
    getProgramParts();
  };

  const canDeleteProgramPart = (programPart: ProgramPart): boolean => (
    activities === undefined ? false : !activities
      .some((a) => a.programPartId === programPart.id));

  const handleCreateActivity = async (activity: Activity) => {
    setActivityLoading(true);
    const client = new Client();
    await client.createActivity(new ActivityParams({
      name: activity.name,
      location: activity.location,
      programPartId: activity.programPartId,
      description: activity.description,
      subscribe: activity.subscribe
        ? new CreateSubscribeActivityParams(activity.subscribe)
        : undefined,
    }));
    getActivities();
  };

  const handleUpdateActivity = async (ac: Activity) => {
    setActivityLoading(true);
    const client = new Client();
    const { speakers: sp, ...activity } = ac;
    await client.updateActivity(activity.id, {
      ...activity,
      subscribe: activity.subscribe ? {
        ...activity.subscribe,
        // @ts-ignore
        id: undefined,
      } : undefined,
      // @ts-ignore
      id: undefined,
    });
    getActivities();
  };

  const handleDeleteActivity = async (activity: Activity) => {
    setActivityLoading(true);
    const client = new Client();
    await client.deleteActivity(activity.id);
    getActivities();
  };

  return (
    <>
      <TypographyHeader variant="h2">Program</TypographyHeader>
      <Paper elevation={3} sx={{ marginBottom: '2rem' }}>
        <CardContent>
          <AdminTable
            entityColumns={pEntityColumns}
            entityName="program part"
            loading={programPartsLoading}
            entities={programParts}
            handleCreate={handleCreateProgramPart}
            handleUpdate={handleUpdateProgramPart}
            handleDelete={handleDeleteProgramPart}
            canDelete={canDeleteProgramPart}
            subHeader="All program parts"
          />
        </CardContent>
      </Paper>
      <Paper elevation={3}>
        <CardContent>
          <AdminTable
            entityColumns={aEntityColumns}
            entityName="activity"
            loading={activityLoading}
            entities={activities}
            handleCreate={handleCreateActivity}
            handleUpdate={handleUpdateActivity}
            handleDelete={handleDeleteActivity}
            subHeader="All activities"
            customButtons={[ActivitySpeakerModal]}
          />
        </CardContent>
      </Paper>
    </>
  );
}

export default AdminProgram;
