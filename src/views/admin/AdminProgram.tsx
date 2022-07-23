import React from 'react';
import { Card, CardContent } from '@mui/material';
import validator from 'validator';
import {
  Activity, Client, ProgramPart,
} from '../../clients/server.generated';
import AdminTable, { Column } from '../../components/admin/AdminTable';
import TypographyHeader from '../../components/TypographyHeader';

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
        setActivities(a);
        setActivityLoading(false);
      });
  };

  React.useEffect(() => {
    getProgramParts();
    getActivities();
  }, []);

  const pEntityColumns: Column<ProgramPart>[] = [{
    attribute: 'beginTime',
    headerName: 'Begin time',
    width: 200,
    updateFieldType: 'string',
    initial: new Date(),
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
  }, {
    attribute: 'endTime',
    headerName: 'End time',
    width: 200,
    updateFieldType: 'string',
    initial: new Date(),
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
  }];

  const aEntityColumns: Column<Activity>[] = [{
    attribute: 'name',
    headerName: 'Name',
    width: 200,
    updateFieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
  }, {
    attribute: 'location',
    headerName: 'Location',
    width: 100,
    updateFieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
  }, {
    attribute: 'description',
    headerName: 'Description',
    width: 200,
    updateFieldType: 'string',
    initial: new Date(),
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
      <Card>
        <CardContent>
          <TypographyHeader variant="h4">All program parts</TypographyHeader>
          <AdminTable
            entityColumns={pEntityColumns}
            entityName="program part"
            loading={programPartsLoading}
            entities={programParts}
            handleCreate={handleCreateProgramPart}
            handleUpdate={handleUpdateProgramPart}
            handleDelete={handleDeleteProgramPart}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <TypographyHeader variant="h4">All activities</TypographyHeader>
          <AdminTable
            entityColumns={aEntityColumns}
            entityName="activity"
            loading={activityLoading}
            entities={activities}
            handleCreate={handleCreateActivity}
            handleUpdate={handleUpdateActivity}
            handleDelete={handleDeleteActivity}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default AdminProgram;
