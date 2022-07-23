import React from 'react';
import { Card, CardContent } from '@mui/material';
import validator from 'validator';
import { Client, Partner } from '../../clients/server.generated';
import AdminTable, { Column } from '../../components/admin/AdminTable';
import TypographyHeader from '../../components/TypographyHeader';

function AdminPartners() {
  const [partners, setPartners] = React.useState<Partner[] | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  const getPartners = () => {
    const client = new Client();
    client.getAllPartners()
      .then((p) => {
        setPartners(p);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getPartners();
  }, []);

  const entityColumns: Column<Partner>[] = [{
    attribute: 'name',
    headerName: 'Name',
    width: 200,
    updateFieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
  }, {
    attribute: 'location',
    headerName: 'Location',
    width: 200,
    updateFieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
  }, {
    attribute: 'specialization',
    headerName: 'Specialization',
    width: 200,
    updateFieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
  }, {
    attribute: 'description',
    headerName: 'Description',
    width: 400,
    updateFieldType: 'text',
    initial: '',
  }, {
    attribute: 'url',
    headerName: 'URL',
    width: 200,
    updateFieldType: 'string',
    initial: '',
    validationError: (value) => typeof value !== 'string' || validator.isEmpty(value),
  }];

  const handleCreate = async (partner: Partner) => {
    setLoading(true);
    const client = new Client();
    await client.createPartner(partner);
    getPartners();
  };

  const handleUpdate = async (partner: Partner) => {
    setLoading(true);
    const client = new Client();
    await client.updatePartner(partner.id, {
      ...partner,
      // @ts-ignore
      id: undefined,
    });
    getPartners();
  };

  const handleDelete = async (partner: Partner) => {
    setLoading(true);
    const client = new Client();
    await client.deletePartner(partner.id);
    getPartners();
  };

  return (
    <>
      <TypographyHeader variant="h2">All Partners</TypographyHeader>
      <Card>
        <CardContent>
          <AdminTable
            entityColumns={entityColumns}
            entityName="partner"
            loading={loading}
            entities={partners}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default AdminPartners;
