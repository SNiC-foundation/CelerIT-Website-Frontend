import React from 'react';
import {
  Box, Button, DialogActions, DialogContent, FormControl,
  Grid, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import BaseEntity from '../../clients/BaseEntity';

export type FieldType = 'string' | 'text' | 'number' | 'datetime' | 'dropdown';

export interface AdminPropDropdownOptions<T extends BaseEntity> {
  key: T[keyof T];
  value: string;
}

export interface AdminPropField<T extends BaseEntity> {
  attribute: keyof T;
  label: string;
  fieldType: FieldType;
  initial: T[keyof T];
  // eslint-disable-next-line no-unused-vars
  error?: (value: T[keyof T], entity?: T) => boolean;
  options?: AdminPropDropdownOptions<T>[];
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
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
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
                  ? field.error(updatedEntity[field.attribute], updatedEntity)
                  : false}
              />
            </FormControl>
          </Grid>
        );
      case 'datetime':
        return (
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
            <DateTimePicker
              onChange={(value) => setUpdatedEntity({
                ...updatedEntity,
                [field.attribute]: value,
              })}
              value={updatedEntity[field.attribute]}
              renderInput={(fieldProps) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...fieldProps}
                  error={field.error !== undefined
                    ? field.error(updatedEntity[field.attribute], updatedEntity)
                    : false}
                />
              )}
              label={field.label}

            />
          </Grid>
        );
      case 'dropdown':
        if (field.options === undefined) throw new Error('\'options\' cannot be undefined when field is of type \'dropdown\'');
        // eslint-disable-next-line no-case-declarations
        const id = `props-field-${field.label.toLowerCase()}`;
        return (
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
            <FormControl fullWidth>
              <InputLabel id={`${id}-label`}>{field.label}</InputLabel>
              <Select
                labelId={`${id}-label`}
                id={id}
                value={updatedEntity[field.attribute]}
                label={field.label}
                onChange={(event) => setUpdatedEntity({
                  ...updatedEntity,
                  [field.attribute]: event.target.value,
                })}
              >
                {field.options.map((option) => (
                  <MenuItem
                    value={option.key as any as string}
                    key={option.key as any as string}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
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
