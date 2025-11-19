// components/columns.ts
import { PointConsumptionRecordData } from "@/lib/api";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PointConsumptionRecordData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "bizCode",
    header: "Business Code",
  },
  {
    accessorKey: "usedPoint",
    header: "Used Point",
  },
  {
    accessorKey: "createTime",
    header: "Create Time",
  },
];
