import React from 'react';
import { Box } from '@mui/material';
import { Ticket } from '../../clients/server.generated';

interface Props {
  ticket: Ticket | null
}

function TicketTrackInfo({ ticket }: Props) {
  if (ticket == null || ticket.user == null) return null;
  return (
    <Box>
      <table>
        <tbody>
          {ticket.user.subscriptions
            .sort((a, b) => a.activity.programPart.id - b.activity.programPart.id)
            .map((s) => (
              <tr key={s.activity.programPart.name}>
                <td>
                  <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>
                    {s.activity.programPart.name}
                  </span>
                </td>
                <td>
                  <span>{s.activity.name}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  );
}

export default TicketTrackInfo;
