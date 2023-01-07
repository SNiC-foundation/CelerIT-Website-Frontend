import React from 'react';
import validator from 'validator';
import {
  Box, Button, CardContent, Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AdminPropField } from '../../components/admin/AdminProps';
import { notEmptyString } from '../../components/admin/defaultValidators';
import TypographyHeader from '../../components/layout/TypographyHeader';
import AdminTable from '../../components/admin/AdminTable';
import {
  Client, Participant, User,
} from '../../clients/server.generated';
import UserRoleModal from '../../components/admin/UserRoleModal';
import { usePartners, useRoles, useUsers } from '../../hooks/useEntities';
import SetPasswordReminderModal from '../../components/mailings/SetPasswordReminderModal';
import TracksReminderModal from '../../components/mailings/TracksReminderModal';
import AutoSubscribeModal from '../../components/program/AutoSubscribeModal';
import FinalInfoModal from '../../components/mailings/FinalInfoModal';

function AdminUsers() {
  const [loading, setLoading] = React.useState(false);
  const { users, loading: loadingUsers, getUsers } = useUsers();
  const { roles, loading: loadingRoles } = useRoles();
  const { partners, loading: loadingPartners } = usePartners();

  const entityColumns: AdminPropField<User, Participant>[] = [{
    attribute: 'name',
    label: 'Name',
    width: 150,
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
    attribute: 'roles',
    label: 'Roles',
    width: 150,
    fieldType: 'custom',
    canBeUpdated: false,
    column: {
      field: 'speakers',
    },
    getRowValue: (user) => user.roles.map((r) => r.name).join(', '),
  }, {
    attribute: 'partnerId',
    label: 'Partner',
    width: 150,
    fieldType: 'dropdown',
    initial: '',
    options: partners ? [{
      key: '',
      value: 'No partner',
      // @ts-ignore
    }, ...partners.map((p) => ({ key: p.id, value: p.name }))] : [],
    canBeUpdated: true,
  }, {
    attribute: 'ticket',
    label: 'Study association',
    width: 200,
    fieldType: 'custom',
    canBeUpdated: false,
    column: {
      field: 'ticket',
    },
    getRowValue: (user) => user.ticket?.association || '',
  }, {
    attribute: 'participantInfo',
    label: 'User is a participant',
    width: 0,
    fieldType: 'nested',
    initial: 0,
    canBeUpdated: true,
    fields: [{
      attribute: 'studyProgram',
      label: 'Study Program',
      width: 200,
      fieldType: 'string',
      initial: '',
      validationError: notEmptyString,
      canBeUpdated: true,
    }],
  }];

  const handleCreateUser = async (user: User) => {
    setLoading(true);
    const client = new Client();
    await client.createUser(user);
    getUsers();
    setLoading(false);
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
    setLoading(false);
  };

  const handleDeleteUser = async (user: User) => {
    setLoading(true);
    const client = new Client();
    await client.deleteUser(user.id);
    getUsers();
    setLoading(false);
  };

  const UserRoleModalWithRoles = (
    { entity }: {entity: User },
  ) => UserRoleModal({ entity, roles: roles || [] });

  return (
    <>
      <TypographyHeader variant="h2">Users</TypographyHeader>
      <Paper elevation={3} sx={{ my: '1rem' }}>
        <CardContent>
          <TypographyHeader variant="h5" sx={{ marginBottom: 0 }}>Emails</TypographyHeader>
          <Box sx={{ marginBottom: '1rem' }}>
            <SetPasswordReminderModal />
            <TracksReminderModal />
            <FinalInfoModal />
          </Box>
          <TypographyHeader variant="h5" sx={{ marginBottom: 0 }}>Actions</TypographyHeader>
          <Box>
            <AutoSubscribeModal />
            <Button
              component={Link}
              to="/admin/users/export"
              variant="contained"
              sx={{ m: '0.5rem' }}
            >
              Export participants
            </Button>
          </Box>
        </CardContent>
      </Paper>
      <Paper elevation={3}>
        <CardContent>
          <AdminTable
            entityName="user"
            loading={loading || loadingUsers || loadingRoles || loadingPartners}
            entityColumns={entityColumns}
            entities={users}
            handleUpdate={handleUpdateUser}
            handleCreate={handleCreateUser}
            handleDelete={handleDeleteUser}
            customButtons={[UserRoleModalWithRoles]}
          />
        </CardContent>
      </Paper>
    </>
  );
}

export default AdminUsers;
