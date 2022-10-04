import React from 'react';
import { CardContent, Paper } from '@mui/material';
import { Client, Speaker } from '../../clients/server.generated';
import AdminTable from '../../components/admin/AdminTable';
import TypographyHeader from '../../components/layout/TypographyHeader';
import { AdminPropField } from '../../components/admin/AdminProps';
import { notEmptyString } from '../../components/admin/defaultValidators';

function AdminSpeakers() {
  const [speakers, setSpeakers] = React.useState<Speaker[] | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  const getSpeakers = () => {
    const client = new Client();
    client.getAllSpeakers(false)
      .then((s) => {
        setSpeakers(s);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getSpeakers();
  }, []);

  const entityColumns: AdminPropField<Speaker>[] = [{
    attribute: 'imageFilename',
    label: '',
    width: 50,
    fieldType: 'image',
    canBeUpdated: false,
    initial: '',
  }, {
    attribute: 'name',
    label: 'Name',
    width: 200,
    fieldType: 'string',
    initial: '',
    validationError: notEmptyString,
    canBeUpdated: true,
  }, {
    attribute: 'description',
    label: 'Description',
    width: 400,
    fieldType: 'text',
    initial: '',
    canBeUpdated: true,
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
      <TypographyHeader variant="h2">All Speakers</TypographyHeader>
      <Paper elevation={3}>
        <CardContent>
          <AdminTable
            entityColumns={entityColumns}
            entityName="speaker"
            loading={loading}
            entities={speakers}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </CardContent>
      </Paper>
    </>
  );
}

export default AdminSpeakers;
