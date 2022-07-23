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
  initial: T[keyof T];
  // eslint-disable-next-line no-unused-vars
  error?: (value: T[keyof T]) => boolean;
}

export interface AdminPropsProps<T extends BaseEntity> {
  entity?: T;
  entityName: string;
  fields: AdminPropField<T>[];
  // eslint-disable-next-line no-unused-vars
  handleSave: (entity: T) => void;
}

function AdminProps<T extends BaseEntity>(props: AdminPropsProps<T>) {
  const {
    entity, entityName, fields, handleSave,
  } = props;

  const [updatedEntity, setUpdatedEntity] = React.useState<T>(() => {
    if (entity) return entity;
    const newEntity: T = {} as T;
    fields.forEach((f) => {
      newEntity[f.attribute] = f.initial;
    });
    return newEntity;
  });

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
                  [field.attribute]: field.fieldType !== 'text' ? event.target.value : event.target.value,
                })}
                error={field.error !== undefined
                  ? field.error(updatedEntity[field.attribute])
                  : false}
              />
            </FormControl>
          </Grid>
        );
      default:
        return null;
    }
  };

  const inputHasErrors = () => fields
    .some((f) => (f.error ? f.error(updatedEntity[f.attribute]) : false));

  return (
    <>
      <DialogContent>
        <Box component="form" sx={{ paddingTop: '0.5em' }}>
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
          title={`Save ${entityName}`}
          disabled={inputHasErrors()}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
}

AdminProps.defaultProps = ({
  entity: undefined,
});

export default AdminProps;
