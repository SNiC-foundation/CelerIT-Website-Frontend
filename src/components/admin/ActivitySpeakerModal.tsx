import React from 'react';
import {
  Dialog, DialogActions,
  DialogContent, DialogTitle, FormControl, InputLabel, LinearProgress,
  MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import Button from '@mui/material/Button';
import {
  Activity, ActivityParams, Client,
} from '../../clients/server.generated';
import AdminTableButton from './AdminTableButton';
import { useSpeakers } from '../../hooks/useEntities';

function ActivitySpeakerModal({ entity } : { entity: Activity; }) {
  const [open, setOpen] = React.useState(false);
  const [chosenSpeakers, setChosenSpeakers] = React.useState<number[]>(
    entity.speakers.map((s) => s.id),
  );
  const [saving, setSaving] = React.useState(false);
  const { loading, speakers } = useSpeakers({ activities: true });

  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setChosenSpeakers(value as any);
  };

  const handleSave = () => {
    setSaving(true);
    const client = new Client();
    const { speakers: sp, ...rest } = entity;
    client.updateActivity(entity.id, new ActivityParams({
      ...rest,
      speakerIds: chosenSpeakers,
    })).then(() => {
      handleClose();
      setSaving(false);
    });
  };

  const speakerOptions = speakers ? speakers.map((s) => ({
    key: s.id,
    value: s.name,
  })) : [];

  return (
    <>
      <AdminTableButton onClick={() => setOpen(true)}>
        <Person fontSize="small" />
      </AdminTableButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {loading || saving ? (<LinearProgress color="primary" />) : null}
        <DialogTitle>Edit speakers</DialogTitle>
        <DialogContent>
          {speakers !== undefined && (
          <FormControl fullWidth sx={{ marginTop: '0.5em' }}>
            <InputLabel id={`${entity.id}-speakers`}>Speakers</InputLabel>
            <Select
              labelId={`${entity.id}-speakers`}
              id={entity.id.toString()}
              // @ts-ignore
              value={chosenSpeakers}
              label="Speakers"
              multiple
              onChange={handleChange}
            >
              {speakerOptions.map((option) => (
                <MenuItem
                  value={option.key as any as string}
                  key={option.key as any as string}
                >
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleSave();
            }}
            variant="contained"
            color="success"
            type="submit"
            disabled={loading || saving}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ActivitySpeakerModal;
