import React from 'react';
import {
  CircularProgress, Input, InputAdornment, InputLabel,
} from '@mui/material';
import validator from 'validator';
import { Check, Clear } from '@mui/icons-material';
import { Client, Ticket } from '../../clients/server.generated';

interface Props {
  ticket: Ticket | undefined;
  // eslint-disable-next-line no-unused-vars
  setTicket: (ticket?: Ticket) => void;
  ticketValid: boolean;
  // eslint-disable-next-line no-unused-vars
  setTicketValid: (valid: boolean) => void;
  disabled?: boolean;
}

function TicketFromField({
  ticket, setTicket, ticketValid, setTicketValid, disabled,
}: Props) {
  const [loading, setLoading] = React.useState(false);
  const [ticketCode, setTicketCode] = React.useState('');
  const handleChange = (value: string) => {
    setTicketCode(value);
    setTicket(undefined);
    setTicketValid(false);
    if (validator.isEmpty(value)) {
      setTicketValid(false);
    }
  };

  const handleUnFocus = async () => {
    if (ticketCode === '') return;

    setLoading(true);
    try {
      const client = new Client();
      const ticketObj = await client.getSingleTicket(ticketCode);
      if (ticketObj && !ticketObj.userId) {
        setTicketValid(true);
        setTicket(ticketObj);
      }
    } catch (e) {
      setTicketValid(false);
    } finally {
      setLoading(false);
    }
  };

  let icon;
  if (loading) {
    icon = (<CircularProgress size={20} />);
  } else if (!ticketValid) {
    icon = (<Clear color="error" />);
  } else {
    icon = (<Check color="success" />);
  }

  return (
    <>
      <InputLabel htmlFor="ticket">Ticket code</InputLabel>
      <Input
        id="ticket"
        onChange={(event) => handleChange(event.target.value)}
        onBlur={() => handleUnFocus()}
        value={ticket !== undefined ? ticket.code : ticketCode}
        endAdornment={(
          <InputAdornment position="end">
            {icon}
          </InputAdornment>
        )}
        disabled={disabled}
      />
    </>
  );
}

TicketFromField.defaultProps = ({
  disabled: false,
});

export default TicketFromField;
