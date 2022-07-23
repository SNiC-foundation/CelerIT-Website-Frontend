import React from 'react';
import {
  DataGrid, GridColDef, GridRowsProp, GridRenderCellParams,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import BaseEntity from '../../clients/BaseEntity';
import { AdminPropField, FieldType } from './AdminProps';
import AdminUpdateEntityModal from './AdminUpdateEntityModal';

export interface Column<T extends BaseEntity> {
  headerName: string;
  attribute: keyof T;
  updateFieldType?: FieldType;
  width: number;
}

interface Props<T extends BaseEntity> {
  entities?: T[];
  entityColumns: Column<T>[];
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (entity: T) => void;
  // eslint-disable-next-line no-unused-vars
  handleCreate: (entity: T) => void;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (entity: T) => void;
}

function AdminTable<T extends BaseEntity>(props: Props<T>) {
  const {
    entities, entityColumns, handleUpdate, handleCreate, handleDelete,
  } = props;

  if (!entities) {
    return null;
  }

  const propFields: AdminPropField<T>[] = entityColumns
    .filter((c) => c.updateFieldType !== undefined)
    .map((c) => ({
      attribute: c.attribute,
      label: c.headerName,
      fieldType: c.updateFieldType!,
    }));

  const columns: GridColDef[] = entityColumns.map((c): GridColDef => ({
    field: c.attribute as string,
    headerName: c.headerName,
    width: c.width,
    renderCell: (params: any) => (
      <span title={params.value}>{params.formattedValue}</span>
    ),
  }));
  columns.push({
    field: 'action',
    headerName: '',
    width: 100,
    renderCell: (params: GridRenderCellParams<any, T>) => (
      <div>
        <AdminUpdateEntityModal entity={params.row} fields={propFields} handleSave={() => {}} />
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            event.preventDefault();
            handleDelete(params.row);
          }}
        >
          Delete
        </Button>
      </div>
    ),
  });

  const rows: GridRowsProp = entities.map((e) => {
    const row: any = {};
    entityColumns.forEach((c) => {
      row[c.attribute] = e[c.attribute];
    });
    return {
      id: e.id,
      ...row,
    };
  });

  return (
    <DataGrid rows={rows} columns={columns} autoHeight />
  );
}

AdminTable.defaultProps = ({
  entities: undefined,
});

export default AdminTable;
