import React from 'react';
import {
  Box, Button, DialogActions, DialogContent, FormControl, Grid, TextField,
} from '@mui/material';
import BaseEntity from '../../clients/BaseEntity';

export type FieldType = 'string' | 'text' | 'number';

export interface AdminPropField<T extends BaseEntity> {
  attribute: keyof T;
  label: string;
  fieldType: FieldType;
}

export interface AdminPropsProps<T extends BaseEntity> {
  entity: T;
  fields: AdminPropField<T>[];
  // eslint-disable-next-line no-unused-vars
  handleSave: (entity: T) => void;
}

function AdminProps<T extends BaseEntity>(props: AdminPropsProps<T>) {
  const { entity, fields, handleSave } = props;

  const [updatedEntity, setUpdatedEntity] = React.useState<T>(entity);

  const getInputField = (field: AdminPropField<T>) => {
    switch (field.fieldType) {
      case 'string':
      case 'text':
        return (
          <Grid item xs={12} sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <TextField
                label={field.label}
                required
                fullWidth
                multiline={field.fieldType === 'text'}
                value={updatedEntity[field.attribute]}
                onChange={(event) => setUpdatedEntity({
                  ...updatedEntity,
                  [field.attribute]: event.target.value,
                })}
              />
            </FormControl>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <DialogContent>
        <Box component="form">
          <Grid container alignItems="center" direction="column" spacing={2}>
            {fields.map((field) => getInputField(field))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event) => {
            event.preventDefault();
            handleSave(updatedEntity);
          }}
          color="success"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
}

export default AdminProps;
