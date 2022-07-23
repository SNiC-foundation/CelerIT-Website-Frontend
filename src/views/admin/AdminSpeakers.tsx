import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Client, Speaker } from '../../clients/server.generated';
import AdminTable, { Column } from '../../components/admin/AdminTable';

function AdminSpeakers() {
  const [speakers, setSpeakers] = React.useState<Speaker[] | undefined>(undefined);

  const getSpeakers = () => {
    const client = new Client();
    client.getAllSpeakers()
      .then((s) => setSpeakers(s));
  };

  React.useEffect(() => {
    getSpeakers();
  }, []);

  const entityColumns: Column<Speaker>[] = [{
    attribute: 'name', headerName: 'Name', width: 200, updateFieldType: 'string',
  }, {
    attribute: 'description', headerName: 'Description', width: 400, updateFieldType: 'text',
  }];

  const handleDelete = async (speaker: Speaker) => {
    const client = new Client();
    await client.deleteSpeaker(speaker.id);
    getSpeakers();
  };

  return (
    <>
      <Typography variant="h1" sx={(theme) => ({ color: theme.palette.text.primary })}>All Speakers</Typography>
      <Card>
        <CardContent>
          <AdminTable entityColumns={entityColumns} entities={speakers} />
        </CardContent>
      </Card>
    </>
  );
}

export default AdminSpeakers;
