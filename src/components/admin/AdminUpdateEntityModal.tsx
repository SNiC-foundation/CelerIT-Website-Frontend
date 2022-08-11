import React from 'react';
import {
  Dialog, Button, DialogTitle,
} from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import AdminProps, { AdminPropsProps } from './AdminProps';
import AdminTableButton from './AdminTableButton';

interface Props<T, P> extends AdminPropsProps<T, P> {}

function AdminUpdateEntityModal<T, P = {}>(props: Props<T, P>) {
  const {
    entity, fields, handleSave, entityName,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const button = () => (entity === undefined ? (
    <Button variant="contained" onClick={() => setOpen(true)} title={`Create ${entityName}`}>
      <Add sx={{ marginRight: '0.25em' }} />
      Create
      {' '}
      {entityName}
    </Button>
  ) : (
    <AdminTableButton
      onClick={() => setOpen(true)}
      title={`Edit ${entityName}`}
    >
      <Edit fontSize="small" />
    </AdminTableButton>
  ));

  const header = () => (entity === undefined ? `Create ${entityName}` : `Update ${entityName}`);

  return (
    <>
      {button()}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {header()}
        </DialogTitle>
        <AdminProps
          entity={entity}
          fields={fields}
          handleSave={(e: T) => {
            handleSave(e);
            handleClose();
          }}
          entityName={entityName}
        />
      </Dialog>
    </>
  );
}

export default AdminUpdateEntityModal;
