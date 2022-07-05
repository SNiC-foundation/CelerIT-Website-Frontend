import React from 'react';
import { Typography } from '@mui/material';
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
    attribute: 'name', headerName: 'Name', width: 200,
  }, {
    attribute: 'description', headerName: 'Description', width: 400,
  }];

  return (
    <>
      <Typography variant="h1">All Speakers</Typography>
      <AdminTable entityColumns={entityColumns} entities={speakers} />
    </>
  );
}

export default AdminSpeakers;
