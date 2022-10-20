import React from 'react';
import {
  DataGrid, GridColDef, GridRowsProp, GridRenderCellParams, GridToolbar,
} from '@mui/x-data-grid';
import { Box, LinearProgress } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { AdminPropField } from './AdminProps';
import AdminUpdateEntityModal from './AdminUpdateEntityModal';
import AdminTableButton from './AdminTableButton';
import AdminTableExpandableCell from './AdminTableExpandableCell';
import TypographyHeader from '../layout/TypographyHeader';
import AdminUploadImage from './AdminUploadImage';
import { apiImageUrl } from '../../helpers/apiHelper';

interface Props<T, P> {
  entities?: T[];
  entityName: string;
  loading: boolean;
  entityColumns: AdminPropField<T, P>[];
  // eslint-disable-next-line no-unused-vars
  handleUpdate?: (entity: T) => void;
  // eslint-disable-next-line no-unused-vars
  handleCreate?: (entity: T) => void;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (entity: T) => void;
  // eslint-disable-next-line no-unused-vars
  canDelete?: (entity: T) => boolean;
  subHeader?: string;
}

function AdminTable<T, P = {}>(props: Props<T, P>) {
  const {
    entities, entityName, loading, entityColumns,
    handleUpdate, handleCreate, handleDelete, canDelete,
    subHeader,
  } = props;

  if (!entities) {
    return null;
  }

  const propFields: AdminPropField<T, P>[] = entityColumns
    .filter((c) => c.canBeUpdated);

  const getColumns = (columns: AdminPropField<T, P>[], parentFields: string[] = [])
    : GridColDef[] => {
    const cols: GridColDef[] = [];
    columns.forEach((c): void => {
      if (c.fieldType === 'nested') {
        cols.push(...getColumns(c.fields as any, [...parentFields, c.attribute as any as string]));
      } else if (c.fieldType === 'image') {
        cols.push({
          field: c.attribute as string,
          headerName: c.label,
          width: c.width,
          filterable: false,
          sortable: false,
          renderCell: (params: GridRenderCellParams<any, T>) => {
            if (params.value === null) return null;
            return (<img alt="logo" src={apiImageUrl(params.value)} style={{ maxHeight: '1rem', maxWidth: '2rem' }} />);
          },
        });
      } else {
        cols.push({
          field: c.attribute as string,
          headerName: c.label,
          width: c.width,
          renderCell: (params: GridRenderCellParams<any, T>) => {
            let value = params.formattedValue;
            if (c.fieldType === 'dropdown') {
              value = c.options.find((o) => o.key === params.value)?.value;
            }
            return (
              <AdminTableExpandableCell value={value} />
            );
          },
          valueGetter: (params) => {
            let intermediate = params.row;
            parentFields.forEach((pf) => {
              intermediate = intermediate[pf];
            });
            return intermediate[c.attribute];
          },
        });
      }
    });
    return cols;
  };

  // const getEntityFromRow = (row: any): T => {
  //   const index = entities.findIndex((e) => (e as any).id === row.id);
  //   if (index >= 0) return entities[index];
  //   throw new Error(`Entity not found with ID ${row.id}`);
  // };

  const columns = getColumns(entityColumns);
  columns.push({
    field: 'Actions',
    headerName: '',
    width: 200,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, T>) => (
      <div>
        <AdminUploadImage
          id={(params.row as any).id}
          entity={entityName}
        />
        {(handleUpdate && entityColumns.some((c) => c.canBeUpdated)) && (
          <AdminUpdateEntityModal
            entity={params.row}
            entityName={entityName}
            fields={propFields}
            handleSave={handleUpdate}
          />
        )}
        <AdminTableButton
          color="error"
          title={`Delete ${entityName}`}
          onClick={(event) => {
            event.preventDefault();
            handleDelete(params.row);
          }}
          disabled={canDelete === undefined ? false : !canDelete(params.row)}
        >
          <Delete fontSize="small" />
        </AdminTableButton>
      </div>
    ),
  });

  const getRows = (cs: AdminPropField<T, P>[], e: T): GridRowsProp => {
    let row: any = {};
    cs.forEach((c) => {
      if (c.fieldType === 'nested') {
        const nestedRows = e[c.attribute]
          ? getRows(c.fields as any, e[c.attribute] as any)
          : {};
        row = {
          ...row,
          [c.attribute]: nestedRows,
        };
      } else {
        row[c.attribute] = e[c.attribute];
      }
    });
    return {
      ...row,
      id: (e as any).id,
    };
  };

  const rows: GridRowsProp = entities.map((e) => getRows(entityColumns, e));

  return (
    <>
      <Box sx={{ textAlign: 'right', marginBottom: '1em', display: 'flex' }}>
        { subHeader !== undefined ? (
          <Box>
            <TypographyHeader variant="h4">{ subHeader }</TypographyHeader>
          </Box>
        ) : null}
        <Box sx={{ flex: 1 }}>
          {(handleCreate && entityColumns.some((c) => c.canBeUpdated)) && (
            <AdminUpdateEntityModal
              fields={propFields}
              entityName={entityName}
              handleSave={handleCreate}
            />
          )}
        </Box>
      </Box>
      <DataGrid
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
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
        disableSelectionOnClick
      />
    </>
  );
}

AdminTable.defaultProps = ({
  entities: undefined,
  canDelete: undefined,
  subHeader: undefined,
  handleCreate: undefined,
  handleUpdate: undefined,
});

export default AdminTable;
