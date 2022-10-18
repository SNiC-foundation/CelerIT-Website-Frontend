import React from 'react';
import Button from '@mui/material/Button';
import {
  Box,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField,
} from '@mui/material';
import validator from 'validator';
import { Add } from '@mui/icons-material';
import { CreateTicketPrams } from '../../clients/server.generated';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSave: (params: CreateTicketPrams) => void;
}

function CreateTicketModal({ handleSave }: Props) {
  const [open, setOpen] = React.useState(false);
  const [association, setAssociation] = React.useState('');
  const [amount, setAmount] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
        variant="contained"
        title="Create tickets"
      >
        <Add sx={{ marginRight: '0.25em' }} />
        Create tickets
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add tickets
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ paddingTop: '0.5em' }}>
            <Grid container alignItems="center" direction="column" spacing={2}>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  <TextField
                    label="Study Association"
                    required
                    fullWidth
                    value={association}
                    onChange={(event) => setAssociation(event.target.value)}
                    error={validator.isEmpty(association)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  <TextField
                    label="Amount of tickets"
                    required
                    fullWidth
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(parseInt(event.target.value, 10))}
                    error={amount <= 0}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleSave(new CreateTicketPrams({
                association,
                amount,
              }));
              handleClose();
              setAssociation('');
              setAmount(0);
            }}
            color="success"
            variant="contained"
            title="Create tickets"
            disabled={validator.isEmpty(association) || amount <= 0}
            type="submit"
          >
            Create tickets
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateTicketModal;
