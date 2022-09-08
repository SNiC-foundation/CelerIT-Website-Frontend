import React from 'react';
import validator from 'validator';
import { Card, CardContent } from '@mui/material';
import { AdminPropField } from '../../components/admin/AdminProps';
import { notEmptyString } from '../../components/admin/defaultValidators';
import TypographyHeader from '../../components/TypographyHeader';
import AdminTable from '../../components/admin/AdminTable';
import { Client, Participant, User } from '../../clients/server.generated';

function AdminUsers() {
  const [users, setUsers] = React.useState<User[] | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  const getUsers = () => {
    const client = new Client();
    client.getAllUsers()
      .then((u) => {
        setUsers(u);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const entityColumns: AdminPropField<User, Participant>[] = [{
    attribute: 'name',
    label: 'Name',
    width: 200,
    fieldType: 'string',
    initial: '',
    validationError: notEmptyString,
    canBeUpdated: true,
  }, {
    attribute: 'email',
    label: 'Email',
    width: 200,
    fieldType: 'string',
    initial: '',
    validationError: (value: any) => notEmptyString(value) || !validator.isEmail(value),
    canBeUpdated: true,
  }, {
    attribute: 'dietaryWishes',
    label: 'Dietary wishes',
    width: 200,
    fieldType: 'text',
    initial: '',
    canBeUpdated: true,
  }, {
    attribute: 'agreeToPrivacyPolicy',
    label: 'Agree to privacy policy',
    width: 180,
    fieldType: 'boolean',
    initial: true,
    canBeUpdated: true,
  }, {
    attribute: 'participantInfo',
    label: 'User is a participant',
    width: 0,
    fieldType: 'nested',
    initial: 0,
    canBeUpdated: true,
    fields: [{
      attribute: 'studyAssociation',
      label: 'Study Association',
      width: 200,
      fieldType: 'string',
      initial: '',
      validationError: notEmptyString,
      canBeUpdated: true,
    }, {
      attribute: 'studyProgram',
      label: 'Study Program',
      width: 200,
      fieldType: 'string',
      initial: '',
      validationError: notEmptyString,
      canBeUpdated: true,
    }, {
      attribute: 'agreeToSharingWithCompanies',
      label: 'Sharing with Companies',
      width: 200,
      fieldType: 'boolean',
      initial: true,
      canBeUpdated: true,
    }],
  }];

  const handleCreateUser = async (user: User) => {
    setLoading(true);
    const client = new Client();
    await client.createUser(user);
    getUsers();
  };

  const handleUpdateUser = async (user: User) => {
    setLoading(true);
    const client = new Client();
    await client.updateUser(user.id, {
      ...user,
      // @ts-ignore
      id: undefined,
    });
    getUsers();
  };

  const handleDeleteUser = async (user: User) => {
    setLoading(true);
    const client = new Client();
    await client.deleteUser(user.id);
    getUsers();
  };

  return (
    <>
      <TypographyHeader variant="h2">Users</TypographyHeader>
      <Card sx={{ marginBottom: '2rem' }}>
        <CardContent>
          <AdminTable
            entityName="user"
            loading={loading}
            entityColumns={entityColumns}
            entities={users}
            handleUpdate={handleUpdateUser}
            handleCreate={handleCreateUser}
            handleDelete={handleDeleteUser}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default AdminUsers;
