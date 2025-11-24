// app/records/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { ServerTable } from "./components/table";
import { columns } from "./common/columns";
import { TableFilter } from "./components/filter";
import { PointChangeTypeEnum } from "@/lib/type";
import { getPointConsumptionRecordApi, GetPointConsumptionRecordApiResData, PointConsumptionRecordData } from "@/lib/api";

export default function RecordsPage() {
  const [pointChangeType, setPointChangeType] = useState<PointChangeTypeEnum | undefined>(undefined);
  const loading = useRef(false);

  const [data, setData] = useState<GetPointConsumptionRecordApiResData>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    list: [],
  });

  // 请求数据
  const loadData = async (pageNum: number) => {
    if (loading.current) return;
    try {
      loading.current = true;
      const res = await getPointConsumptionRecordApi({
        pageNum,
        pageSize: data.pageSize,
        pointChangeTypeEnum: pointChangeType,
        // bizCode: BizCode.REMOVE,
      });
      if (res.code !== 10000) return;
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      loading.current = false;
    }
  };

  const handleChangePage = (page: number) => {
    if ((page + 1) === data.pageNum) return;
    setData({
      ...data,
      pageNum: page + 1,
    });
    loadData(page + 1);
  };

  // 当页码或筛选条件改变 → 请求接口
  useEffect(() => {
    loadData(1);
  }, [pointChangeType]);

  useEffect(() => {
    loadData(1);
  }, []);

  useEffect(() => {
    loadData(data.pageNum);
  }, [data.pageNum]);

  return (
    <div className="flex p-6 sm:p-10">
      <div className="w-full max-w-2xl bg-white shadow-sm rounded-xl p-6 sm:p-10">
        <h1 className="text-2xl font-semibold mb-6">Usage & billing</h1>

        {/* 搜索条件 */}
        <div className="flex gap-3 pb-6">
          <TableFilter
            value={pointChangeType}
            onChange={(val) => {
              setPointChangeType(val);
            }}
          />
        </div>

        {/* 表格 */}
        <ServerTable<PointConsumptionRecordData>
          columns={columns}
          data={data.list}
          total={data.total}
          pageIndex={data.pageNum - 1}
          pageSize={data.pageSize}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  );
}

