import React from 'react';
import { Button, Dialog } from '@mui/material';
import AdminProps, { AdminPropsProps } from './AdminProps';
import BaseEntity from '../../clients/BaseEntity';

interface Props<T extends BaseEntity> extends AdminPropsProps<T> {}

function AdminUpdateEntityModal<T extends BaseEntity>(props: Props<T>) {
  const {
    entity, fields, handleSave,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Edit</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <AdminProps entity={entity} fields={fields} handleSave={handleSave} />
      </Dialog>
    </>
  );
}

export default AdminUpdateEntityModal;
