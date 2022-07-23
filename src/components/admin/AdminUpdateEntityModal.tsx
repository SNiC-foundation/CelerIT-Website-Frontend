import React from 'react';
import { Dialog, Button } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import AdminProps, { AdminPropsProps } from './AdminProps';
import BaseEntity from '../../clients/BaseEntity';
import AdminTableButton from './AdminTableButton';

interface Props<T extends BaseEntity> extends AdminPropsProps<T> {}

function AdminUpdateEntityModal<T extends BaseEntity>(props: Props<T>) {
  const {
    entity, fields, handleSave,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const button = () => (entity === undefined ? (
    <Button variant="contained" onClick={() => setOpen(true)}>
      <Add sx={{ marginRight: '0.25em' }} />
      Create
    </Button>
  ) : (
    <AdminTableButton onClick={() => setOpen(true)}><Edit fontSize="small" /></AdminTableButton>
  ));

  return (
    <>
      {button()}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <AdminProps
          entity={entity}
          fields={fields}
          handleSave={(e: T) => {
            handleSave(e);
            handleClose();
          }}
        />
      </Dialog>
    </>
  );
}

export default AdminUpdateEntityModal;
