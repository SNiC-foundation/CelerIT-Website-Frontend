import React from 'react';
import {
  Box,
  Button, CardContent, LinearProgress, Link, Paper,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Client, ParticipantExport } from '../../clients/server.generated';
import { AlertContext } from '../../alerts/AlertContextProvider';
import TypographyHeader from '../../components/layout/TypographyHeader';

function AdminParticipantsExport() {
  const [loading, setLoading] = React.useState(true);
  const [participants, setParticipants] = React
    .useState<ParticipantExport[] | undefined>(undefined);

  const { showAlert } = React.useContext(AlertContext);

  React.useEffect(() => {
    const client = new Client();
    client.getParticipantsExport()
      .then((p) => setParticipants(p))
      .catch(() => showAlert({
        severity: 'error',
        message: 'Something went wrong with fetching the participant export',
      }))
      .finally(() => setLoading(false));
  }, []);

  const columns: GridColDef[] = [{
    field: 'id',
    headerName: 'ID',
    width: 50,
  }, {
    field: 'ticket',
    headerName: 'Ticket code',
    width: 150,
  }, {
    field: 'name',
    headerName: 'Name',
    width: 200,
  }, {
    field: 'studyAssociation',
    headerName: 'Study Association',
    width: 170,
  }, {
    field: 'studyProgram',
    headerName: 'Study Program',
    width: 200,
  }, {
    field: 'qrCode',
    headerName: 'QR Code',
    width: 300,
  }, {
    field: 'track1Name',
    headerName: 'Track 1 name',
    width: 300,
  }, {
    field: 'track1Location',
    headerName: 'Track 1 Location',
    width: 150,
  }, {
    field: 'track2Name',
    headerName: 'Track 2 name',
    width: 300,
  }, {
    field: 'track2Location',
    headerName: 'Track 2 Location',
    width: 150,
  }, {
    field: 'track3Name',
    headerName: 'Track 3 name',
    width: 300,
  }, {
    field: 'track3Location',
    headerName: 'Track 3 Location',
    width: 150,
  }];

  return (
    <>
      <TypographyHeader variant="h2">Participant export</TypographyHeader>
      <Paper elevation={3} sx={{ my: '1rem' }}>
        {loading && (<LinearProgress />)}
        <CardContent>
          {participants !== undefined && (
            <>
              <Box sx={{ textAlign: 'right', mb: '1rem' }}>
                <Button component={Link} href="/api/participant/export/qrcodes" variant="contained">Download QR codes</Button>
              </Box>
              <DataGrid
                columns={columns}
                rows={participants}
                autoHeight
                getRowHeight={() => 'auto'}
                getEstimatedRowHeight={() => 200}
                components={{
                  LoadingOverlay: LinearProgress,
                  Toolbar: GridToolbar,
                }}
              />
            </>
          )}
        </CardContent>
      </Paper>
    </>
  );
}

export default AdminParticipantsExport;
