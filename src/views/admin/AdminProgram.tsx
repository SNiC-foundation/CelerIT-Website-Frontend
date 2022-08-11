import React from 'react';
import { Card, CardContent } from '@mui/material';
import validator from 'validator';
import {
  Activity, Client, ProgramPart, Speaker, SubscribeActivity,
} from '../../clients/server.generated';
import AdminTable from '../../components/admin/AdminTable';
import TypographyHeader from '../../components/TypographyHeader';
import { AdminPropDropdownOptions, AdminPropField } from '../../components/admin/AdminProps';

function AdminProgram() {
  const [programParts, setProgramParts] = React.useState<ProgramPart[] | undefined>(undefined);
  const [activities, setActivities] = React.useState<Activity[] | undefined>(undefined);
  const [speakers, setSpeakers] = React.useState<Speaker[] | undefined>(undefined);
  // eslint-disable-next-line no-unused-vars
  const [programPartsLoading, setProgramPartsLoading] = React.useState(true);
  const [activityLoading, setActivityLoading] = React.useState(true);
  const [speakerLoading, setSpeakerLoading] = React.useState(true);

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
        setActivities(a);
        setActivityLoading(false);
      });
  };

  const getSpeakers = () => {
    const client = new Client();
    client.getAllSpeakers()
      .then((s) => {
        setSpeakers(s);
        setSpeakerLoading(false);
      });
  };

  React.useEffect(() => {
    getProgramParts();
    getActivities();
    getSpeakers();
  }, []);

  const pEntityColumns: AdminPropField<ProgramPart>[] = [{
    attribute: 'name',
    label: 'Name',
    width: 250,
    fieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
    canBeUpdated: true,
  }, {
    attribute: 'beginTime',
    label: 'Begin time',
    width: 200,
    fieldType: 'datetime',
    initial: new Date(),
    validationError: (value) => value === null || value === undefined || value.toString() === '',
    canBeUpdated: true,
  }, {
    attribute: 'endTime',
    label: 'End time',
    width: 200,
    fieldType: 'datetime',
    initial: new Date(),
    validationError: (value, entity) => value === null || value === undefined
    || value.toString() === '' || (entity !== undefined && value <= entity.beginTime),
    canBeUpdated: true,
  }];

  const noSpeakerOption: AdminPropDropdownOptions<Activity> = {
    key: '',
    value: (<i>No speaker</i>),
  };
  const speakerOptions = speakers ? [noSpeakerOption, ...speakers.map((s) => ({
    key: s.id,
    value: s.name,
  }))] : [noSpeakerOption];

  const aEntityColumns: AdminPropField<Activity, SubscribeActivity>[] = [{
    attribute: 'name',
    label: 'Name',
    width: 200,
    fieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
    canBeUpdated: true,
  }, {
    attribute: 'programPartId',
    label: 'Program Part',
    width: 150,
    fieldType: 'dropdown',
    initial: programParts && programParts.length > 0 ? programParts[0].id : '',
    options: programParts ? programParts.map((p) => ({
      key: p.id,
      value: p.id.toString(),
    })) : [],
    canBeUpdated: true,
  }, {
    attribute: 'location',
    label: 'Location',
    width: 100,
    fieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
    canBeUpdated: true,
  }, {
    attribute: 'speakerId',
    label: 'Speaker',
    width: 150,
    fieldType: 'dropdown',
    initial: undefined,
    options: speakerOptions,
    canBeUpdated: true,
  }, {
    attribute: 'description',
    label: 'Description',
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
      validationError: (value) => value === null || value === undefined || value.toString() === '',
      canBeUpdated: true,
    }, {
      attribute: 'subscriptionListCloseDate',
      label: 'Subscription list close',
      width: 200,
      fieldType: 'datetime',
      initial: new Date(),
      validationError: (value, entity) => value === null || value === undefined
      || value.toString() === '' || (entity !== undefined && value <= entity.subscriptionListOpenDate),
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
    await client.createActivity(activity);
    getActivities();
  };

  const handleUpdateActivity = async (activity: Activity) => {
    setActivityLoading(true);
    const client = new Client();
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
      <Card sx={{ marginBottom: '2rem' }}>
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
      </Card>
      <Card>
        <CardContent>
          <AdminTable
            entityColumns={aEntityColumns}
            entityName="activity"
            loading={activityLoading || speakerLoading}
            entities={activities}
            handleCreate={handleCreateActivity}
            handleUpdate={handleUpdateActivity}
            handleDelete={handleDeleteActivity}
            subHeader="All activities"
          />
        </CardContent>
      </Card>
    </>
  );
}

export default AdminProgram;
