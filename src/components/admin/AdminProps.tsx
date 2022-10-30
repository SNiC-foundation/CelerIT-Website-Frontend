import React from 'react';
import {
  Box, Button, Checkbox, DialogActions, DialogContent, FormControl, FormControlLabel,
  Grid, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { GridColDef } from '@mui/x-data-grid';

export interface AdminPropDropdownOptions<T> {
  key: T[keyof T] | '';
  value: React.ReactNode | string;
}

export type BasePropField<T> = {
  attribute: keyof T,
  label: string,
  initial: T[keyof T],
  // eslint-disable-next-line no-unused-vars
  validationError?: (value: T[keyof T], entity?: T) => boolean,
  width: number,
  canBeUpdated: boolean,
}

export type GeneralPropField<T> = BasePropField<T> & {
  fieldType: 'string' | 'text' | 'number' | 'datetime' | 'image',
}

export type DropdownPropField<T> = BasePropField<T> & {
  fieldType: 'dropdown',
  options: AdminPropDropdownOptions<T>[],
}

export type BooleanPropField<T> = BasePropField<T> & {
  fieldType: 'boolean',
}

export type NestedPropField<T, P> = BasePropField<T> & {
  fieldType: 'nested'
  // eslint-disable-next-line no-use-before-define
  fields: AdminPropField<P>[]
}

export type AutomaticPropField<T, P = {}> = NestedPropField<T, P>
  | GeneralPropField<T>
  | DropdownPropField<T>
  | BooleanPropField<T>;

export type CustomPropField<T> = {
  attribute: string,
  label: string,
  width: number,
  column: GridColDef,
  // eslint-disable-next-line no-unused-vars
  getRowValue: (ent: T) => string,
  canBeUpdated: false,
  fieldType: 'custom',
}

export type AdminPropField<T, P = {}> = AutomaticPropField<T, P> | CustomPropField<T>;

export interface AdminPropsProps<T, P> {
  entity?: T;
  entityName: string;
  fields: AutomaticPropField<T, P>[];
  // eslint-disable-next-line no-unused-vars
  handleSave: (entity: T) => void;
}

function AdminProps<T, P = {}>(props: AdminPropsProps<T, P>) {
  const {
    entity, entityName, fields, handleSave,
  } = props;

  const constructNewEntity = (fs: AutomaticPropField<T, P>[]): T => {
    let newEntity: T = {} as T;
    fs.forEach((f) => {
      if (f.fieldType === 'nested') {
        const nestedAttributes = constructNewEntity(f.fields as any);
        newEntity = {
          ...newEntity,
          [f.attribute]: nestedAttributes,
        };
      } else {
        newEntity[f.attribute] = f.initial;
      }
    });
    return newEntity;
  };

  const [updatedEntity, setUpdatedEntity] = React.useState<T>(() => {
    if (entity) {
      const e = { ...entity };
      Object.keys(entity).forEach((k) => {
        // @ts-ignore
        if (typeof entity[k] === 'object' && entity[k] && Object.keys(entity[k]).length === 0) {
          // @ts-ignore
          e[k] = undefined;
        }
      });
      return e;
    }
    return constructNewEntity(fields);
  });

  // Our backend and client do not handle undefined and null-values well. Therefore,
  // when we use a dropdown, we have to set empty values to undefined.
  const handleSaveWithPreprocessing = (ent: T) => {
    const entityToSave = {
      ...ent,
    };
    fields.forEach((f) => {
      // @ts-ignore
      if (f.fieldType === 'dropdown' && updatedEntity[f.attribute] === '') {
        // @ts-ignore
        entityToSave[f.attribute] = undefined;
      } else if (updatedEntity[f.attribute] === null) {
        // @ts-ignore
        entityToSave[f.attribute] = undefined;
      }
    });
    handleSave(entityToSave);
  };

  const updateSingleField = (
    attribute: keyof T,
    value: T[keyof T] | undefined,
    parentAttribute?: keyof T,
  ) => {
    if (parentAttribute) {
      setUpdatedEntity({
        ...updatedEntity,
        [parentAttribute]: {
          ...updatedEntity[parentAttribute],
          [attribute]: value,
        },
      });
    } else {
      setUpdatedEntity({
        ...updatedEntity,
        [attribute]: value,
      });
    }
  };

  const error = (field: AutomaticPropField<T>, parentAttribute?: keyof T) => {
    if (parentAttribute) {
      return field.validationError !== undefined
        ? field.validationError(
          (updatedEntity[parentAttribute] as any)[field.attribute] as any,
          updatedEntity,
        )
        : false;
    }
    return field.validationError !== undefined
      ? field.validationError(updatedEntity[field.attribute], updatedEntity)
      : false;
  };

  const getInputField = (field: AutomaticPropField<T, P>, parentField?: keyof T) => {
    const currentValue = parentField
      // @ts-ignore
      ? (updatedEntity[parentField])[field.attribute]
      : updatedEntity[field.attribute];
    switch (field.fieldType) {
      case 'string':
      case 'text':
        return (
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
            <FormControl fullWidth>
              <TextField
                label={field.label}
                required={field.validationError !== undefined}
                fullWidth
                multiline={field.fieldType === 'text'}
                value={currentValue}
                onChange={(event) => (
                  updateSingleField(field.attribute, event.target.value as any, parentField)
                )}
                error={error(field, parentField)}
              />
            </FormControl>
          </Grid>
        );
      case 'number':
        return (
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
            <FormControl fullWidth>
              <TextField
                label={field.label}
                required={field.validationError !== undefined}
                fullWidth
                type="number"
                value={currentValue}
                onChange={(event) => (
                  updateSingleField(
                    field.attribute,
                    parseInt(event.target.value, 10) as any,
                    parentField,
                  )
                )}
                error={error(field, parentField)}
              />
            </FormControl>
          </Grid>
        );
      case 'datetime':
        return (
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
            <DateTimePicker
              onChange={(value) => updateSingleField(field.attribute, value as any, parentField)}
              value={currentValue}
              renderInput={(fieldProps) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...fieldProps}
                  error={error(field, parentField)}
                  required={field.validationError !== undefined}
                />
              )}
              label={field.label}
              views={['year', 'day', 'hours', 'minutes', 'seconds']}
            />
          </Grid>
        );
      case 'dropdown':
        // eslint-disable-next-line no-case-declarations
        const id = `props-field-${field.label.toLowerCase()}`;
        return (
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
            <FormControl fullWidth>
              <InputLabel id={`${id}-label`}>{field.label}</InputLabel>
              <Select
                labelId={`${id}-label`}
                required={field.validationError !== undefined}
                id={id}
                value={currentValue}
                label={field.label}
                onChange={(event) => (
                  updateSingleField(field.attribute, event.target.value as any, parentField)
                )}
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
      case 'boolean':
        return (
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
            <FormControl fullWidth>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={currentValue}
                    onChange={(event) => (
                      updateSingleField(field.attribute, event.target.checked as any, parentField)
                    )}
                  />
                )}
                label={field.label}
              />
            </FormControl>
          </Grid>
        );
      case 'nested':
        return (
          <Grid item xs={12} sx={{ width: '100%' }} key={field.attribute as string}>
            <hr />
            <FormControl sx={{ marginBottom: '1rem' }}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={updatedEntity[field.attribute] !== undefined}
                    onChange={(event) => {
                      if (event.target.checked && entity !== undefined) {
                        updateSingleField(field.attribute, entity[field.attribute]);
                      } else if (event.target.checked && entity === undefined) {
                        updateSingleField(
                          field.attribute,
                          constructNewEntity(field.fields as any) as any,
                        );
                      } else {
                        updateSingleField(field.attribute, undefined);
                      }
                    }}
                  />
                )}
                label={field.label}
              />
            </FormControl>
            {updatedEntity[field.attribute] !== undefined ? (
              <Grid container alignItems="center" direction="column" spacing={2}>
                {field.fields.map((f) => getInputField(f as any, field.attribute))}
              </Grid>
            ) : null}
          </Grid>
        );
      default:
        return null;
    }
  };

  const inputHasErrors = (
    inputFields: AutomaticPropField<T>[],
    parentField?: string,
  ): boolean => inputFields
    .some((f) => {
      if (f.fieldType === 'nested') return updatedEntity[f.attribute] !== undefined ? inputHasErrors(f.fields as any, f.attribute as any) : false;
      if (f.validationError) {
        return parentField
          // @ts-ignore
          ? f.validationError(updatedEntity[parentField][f.attribute])
          : f.validationError(updatedEntity[f.attribute]);
      }
      return false;
    });

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
            handleSaveWithPreprocessing(updatedEntity);
          }}
          color="success"
          variant="contained"
          title={`Save ${entityName}`}
          disabled={inputHasErrors(fields as any)}
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
