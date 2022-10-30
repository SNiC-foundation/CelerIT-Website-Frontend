import React from 'react';
import {
  Dialog, DialogActions,
  DialogContent, DialogTitle, FormControl, InputLabel, LinearProgress,
  MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { Badge } from '@mui/icons-material';
import Button from '@mui/material/Button';
import {
  Client, User,
} from '../../clients/server.generated';
import AdminTableButton from './AdminTableButton';
import { useRoles } from '../../hooks/useEntities';

function ActivityRoleModal({ entity } : { entity: User; }) {
  const [open, setOpen] = React.useState(false);
  const [chosenRoles, setChosenRoles] = React.useState<number[]>(
    entity.roles.map((s) => s.id),
  );
  const [saving, setSaving] = React.useState(false);
  const { loading, roles } = useRoles();

  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setChosenRoles(value as any);
  };

  const handleSave = () => {
    setSaving(true);
    const client = new Client();
    client.updateUserRoles(entity.id, chosenRoles).then(() => {
      handleClose();
      setSaving(false);
    });
  };

  const roleOptions = roles ? roles.map((s) => ({
    key: s.id,
    value: s.name,
  })) : [];

  return (
    <>
      <AdminTableButton onClick={() => setOpen(true)}>
        <Badge fontSize="small" />
      </AdminTableButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {loading || saving ? (<LinearProgress color="primary" />) : null}
        <DialogTitle>Edit roles</DialogTitle>
        <DialogContent>
          {roles !== undefined && (
            <FormControl fullWidth sx={{ marginTop: '0.5em' }}>
              <InputLabel id={`${entity.id}-roles`}>Roles</InputLabel>
              <Select
                labelId={`${entity.id}-roles`}
                id={entity.id.toString()}
                // @ts-ignore
                value={chosenRoles}
                label="Roles"
                multiple
                onChange={handleChange}
              >
                {roleOptions.map((option) => (
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

export default ActivityRoleModal;
