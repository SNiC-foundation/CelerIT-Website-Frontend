import React from 'react';
import {
  DataGrid, GridColDef, GridRowsProp, GridRenderCellParams,
} from '@mui/x-data-grid';
import { Box, LinearProgress } from '@mui/material';
import { Delete } from '@mui/icons-material';
import BaseEntity from '../../clients/BaseEntity';
import { AdminPropField, FieldType } from './AdminProps';
import AdminUpdateEntityModal from './AdminUpdateEntityModal';
import AdminTableButton from './AdminTableButton';
import AdminTableExpandableCell from './AdminTableExpandableCell';

export interface Column<T extends BaseEntity> {
  headerName: string;
  attribute: keyof T;
  updateFieldType?: FieldType;
  width: number;
  initial: T[keyof T];
  // eslint-disable-next-line no-unused-vars
  validationError?: (value: T[keyof T]) => boolean;
}

interface Props<T extends BaseEntity> {
  entities?: T[];
  entityName: string;
  loading: boolean;
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
    entities, entityName, loading, entityColumns, handleUpdate, handleCreate, handleDelete,
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
      initial: c.initial,
      error: c.validationError,
    }));

  const columns: GridColDef[] = entityColumns.map((c): GridColDef => ({
    field: c.attribute as string,
    headerName: c.headerName,
    width: c.width,
    renderCell: (params: GridRenderCellParams<any, T>) => (
      <AdminTableExpandableCell value={params.formattedValue} />
    ),
  }));
  columns.push({
    field: 'action',
    headerName: '',
    width: 200,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<any, T>) => (
      <div>
        <AdminUpdateEntityModal
          entity={params.row}
          entityName={entityName}
          fields={propFields}
          handleSave={handleUpdate}
        />
        <AdminTableButton
          color="error"
          title={`Delete ${entityName}`}
          onClick={(event) => {
            event.preventDefault();
            handleDelete(params.row);
          }}
        >
          <Delete fontSize="small" />
        </AdminTableButton>
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
    <>
      <Box sx={{ textAlign: 'right', marginBottom: '1em' }}>
        <AdminUpdateEntityModal
          fields={propFields}
          entityName={entityName}
          handleSave={handleCreate}
        />
      </Box>
      <DataGrid
        components={{
          LoadingOverlay: LinearProgress,
        }}
        rows={rows}
        columns={columns}
        autoHeight
        loading={loading}
        getRowHeight={() => 'auto'}
        getEstimatedRowHeight={() => 200}
        sx={{
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
        }}
      />
    </>
  );
}

AdminTable.defaultProps = ({
  entities: undefined,
});

export default AdminTable;
