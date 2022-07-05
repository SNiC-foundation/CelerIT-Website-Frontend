import React from 'react';
import { Typography } from '@mui/material';
import { Client, Partner } from '../../clients/server.generated';
import AdminTable, { Column } from '../../components/admin/AdminTable';

function AdminPartners() {
  const [partners, setPartners] = React.useState<Partner[] | undefined>(undefined);

  const getPartners = () => {
    const client = new Client();
    client.getAllPartners()
      .then((p) => setPartners(p));
  };

  React.useEffect(() => {
    getPartners();
  }, []);

  const entityColumns: Column<Partner>[] = [{
    attribute: 'name', headerName: 'Name', width: 200,
  }];

  return (
    <>
      <Typography variant="h1">All Partners</Typography>
      <AdminTable entityColumns={entityColumns} entities={partners} />
    </>
  );
}

export default AdminPartners;
