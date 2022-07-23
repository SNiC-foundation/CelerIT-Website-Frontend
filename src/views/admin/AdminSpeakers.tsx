import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Client, Speaker } from '../../clients/server.generated';
import AdminTable, { Column } from '../../components/admin/AdminTable';

function AdminSpeakers() {
  const [speakers, setSpeakers] = React.useState<Speaker[] | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  const getSpeakers = () => {
    const client = new Client();
    client.getAllSpeakers()
      .then((s) => {
        setSpeakers(s);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getSpeakers();
  }, []);

  const entityColumns: Column<Speaker>[] = [{
    attribute: 'name', headerName: 'Name', width: 200, updateFieldType: 'string', initial: '',
  }, {
    attribute: 'description', headerName: 'Description', width: 400, updateFieldType: 'text', initial: '',
  }];

  const handleCreate = async (speaker: Speaker) => {
    setLoading(true);
    const client = new Client();
    await client.createSpeaker(speaker);
    getSpeakers();
  };

  const handleUpdate = async (speaker: Speaker) => {
    setLoading(true);
    const client = new Client();
    await client.updateSpeaker(speaker.id, {
      ...speaker,
      // @ts-ignore
      id: undefined,
    });
    getSpeakers();
  };

  const handleDelete = async (speaker: Speaker) => {
    setLoading(true);
    const client = new Client();
    await client.deleteSpeaker(speaker.id);
    getSpeakers();
  };

  return (
    <>
      <Typography variant="h1" sx={(theme) => ({ color: theme.palette.text.primary })}>All Speakers</Typography>
      <Card>
        <CardContent>
          <AdminTable
            entityColumns={entityColumns}
            loading={loading}
            entities={speakers}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default AdminSpeakers;
