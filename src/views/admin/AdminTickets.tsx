import React from 'react';
import { Box, CardContent, Paper } from '@mui/material';
import {
  Client, CreateTicketPrams, Ticket, User,
} from '../../clients/server.generated';
import AdminTable from '../../components/admin/AdminTable';
import TypographyHeader from '../../components/layout/TypographyHeader';
import { AdminPropField } from '../../components/admin/AdminProps';
import CreateTicketModal from '../../components/ticket/CreateTicketModal';

function AdminTickets() {
  const [tickets, setTickets] = React.useState<Ticket[] | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  const getTickets = () => {
    const client = new Client();
    client.getAllTickets(undefined, undefined)
      .then((t) => {
        setTickets(t);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getTickets();
  }, []);

  const entityColumns: AdminPropField<Ticket, User>[] = [{
    attribute: 'association',
    label: 'Association',
    width: 300,
    fieldType: 'string',
    canBeUpdated: false,
    initial: '',
  }, {
    attribute: 'code',
    label: 'Code',
    width: 150,
    fieldType: 'string',
    canBeUpdated: false,
    initial: '',
  }, {
    attribute: 'user',
    label: 'User',
    width: 0,
    fieldType: 'nested',
    canBeUpdated: false,
    initial: 0,
    fields: [{
      attribute: 'name',
      label: 'Claimed by',
      width: 250,
      fieldType: 'string',
      canBeUpdated: false,
      initial: '',
    }],
  }];

  const handleCreate = async (params: CreateTicketPrams) => {
    setLoading(true);
    const client = new Client();
    await client.createTicket(params);
    getTickets();
  };

  const handleDelete = async (ticket: Ticket) => {
    setLoading(true);
    const client = new Client();
    await client.deleteTicket(ticket.id);
    getTickets();
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100%' }}>
      <TypographyHeader variant="h2">All Tickets</TypographyHeader>
      <Paper elevation={3}>
        <CardContent>
          <Box sx={{ textAlign: 'right', marginBottom: '1em' }}>
            <CreateTicketModal handleSave={handleCreate} />
          </Box>
          <AdminTable
            entityColumns={entityColumns}
            entityName="ticket"
            loading={loading}
            entities={tickets}
            handleDelete={handleDelete}
          />
        </CardContent>
      </Paper>
    </Box>
  );
}

export default AdminTickets;
