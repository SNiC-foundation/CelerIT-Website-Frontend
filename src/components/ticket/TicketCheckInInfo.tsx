import React from 'react';
import { Box } from '@mui/material';
import { Ticket } from '../../clients/server.generated';

interface Props {
  ticket: Ticket | null
}

function TicketCheckInInfo({ ticket }: Props) {
  const properties = [{
    label: 'Ticket code',
    value: ticket?.code || '',
  }, {
    label: 'Name',
    value: ticket?.user?.name || '',
  }, {
    label: 'Study association',
    value: ticket?.association || '',
  }, {
    label: 'Study program',
    value: ticket?.user?.participantInfo?.studyProgram || '',
  }];

  return (
    <Box>
      <table>
        <tbody>
          {properties.map((p) => (
            <tr key={p.label}>
              <td>
                <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{p.label}</span>
              </td>
              <td>
                <span>{p.value}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

export default TicketCheckInInfo;
