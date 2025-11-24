// components/data-table.tsx
"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { PaginationComp } from "./pagination";
import { FileQuestionMark } from "lucide-react";

interface ServerTableProps<TData> {
  columns: ColumnDef<TData, any>[]; // TValue 由 ColumnDef 自动推断，无需显式传
  data: TData[];
  total: number;
  pageIndex: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function ServerTable<TData>({
  columns,
  data,
  total,
  pageIndex,
  pageSize,
  onPageChange,
}: ServerTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      pagination: { pageIndex, pageSize },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-[4px] h-[calc(50vh+3rem)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="h-[3rem] py-0 bg-[#f5f5f5]" key={header.id}>
                    {header.column.columnDef.header as string}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="max-h-[50vh] overflow-y-auto">
            {data.length === 0 && (
              <TableRow className="bg-[#f5f5f5]">
                <TableCell colSpan={columns.length} className="h-12 py-0 text-center">
                  <FileQuestionMark className="w-12 h-10 m-auto text-gray-400" />
                </TableCell>
              </TableRow>
            )}
            {data.map((row: any, i: number) => (
              <TableRow key={i} className="bg-[#f5f5f5]">
                {table.getVisibleLeafColumns().map((col) => (
                  <TableCell className="h-12 py-0" key={col.id}>{row[col.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 分页器 */}
      <PaginationComp
        pageIndex={pageIndex}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
      />
    </div>
  );
}
