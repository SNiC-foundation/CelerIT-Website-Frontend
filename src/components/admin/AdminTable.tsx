import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface Column<T extends BaseEntity> {
  headerName: string;
  attribute: keyof T;
  width: number;
}

interface Props<T extends BaseEntity> {
  entities?: T[];
  entityColumns: Column<T>[];
}

function AdminTable<T extends BaseEntity>(props: Props<T>) {
  const { entities, entityColumns } = props;

  if (!entities) {
    return null;
  }

  // @ts-ignore
  const columns: GridColDef[] = entityColumns.map((c) => ({
    field: c.attribute as string,
    headerName: c.headerName,
    width: c.width,
    renderCell: (params: any) => (
      <span title={params.value}>{params.formattedValue}</span>
    ),
  }));

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
