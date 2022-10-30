import React from 'react';
import { Box } from '@mui/material';
import TimeAgo from 'javascript-time-ago';
import { Ticket } from '../../clients/server.generated';

interface Props {
  ticket: Ticket | null
}

function TicketScanHistory({ ticket }: Props) {
  const timeAgo = new TimeAgo('en-US');

  if (ticket == null) return null;

  if (ticket.scans.length === 0) {
    return (
      <span style={{ fontStyle: 'italic' }}>You have scanned this ticket for the first time.</span>
    );
  }
  return (
    <Box>
      <table>
        <tbody>
          {ticket.scans.map((s) => (
            <tr key={s.id}>
              <td>
                <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{timeAgo.format(s.createdAt)}</span>
              </td>
              <td>
                <span>{s.user.name}</span>
              </td>
            </tr>
          )).reverse()}
        </tbody>
      </table>
    </Box>
  );
}

export default TicketScanHistory;
