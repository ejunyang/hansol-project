"use client";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { endOfMonth, startOfMonth } from "date-fns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterRange: DateRange | undefined;
  setFilterRange: (date: DateRange | undefined) => void;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { columns, data, filterRange, setFilterRange } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [activeTab, setActiveTab] = React.useState("전체 판독 상태");

  // 필터링 데이터
  const filteredData = React.useMemo(() => {
    let result = data;

    // 날짜 필터 적용
    if (filterRange?.from && filterRange.to) {
      // to 날짜를 하루의 마지막 시간으로 설정
      const fromDate = new Date(filterRange.from);
      const toDate = new Date(filterRange.to);
      toDate.setHours(23, 59, 59, 999);

      result = result.filter((row) => {
        const rowDate = new Date((row as { create_time: string }).create_time);
        return rowDate >= fromDate && rowDate <= toDate;
      });
    }

    return result as TData[];
  }, [data, filterRange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleFilter = (filterType?: string) => {
    if (!filterType) {
      setActiveTab("전체 판독 상태");
      setColumnFilters([]);
    } else if (filterType === "합격") {
      setActiveTab("합격");
      setColumnFilters([{ id: "totalStatus", value: true }]);
    } else if (filterType === "불합격") {
      setActiveTab("불합격");
      setColumnFilters([{ id: "totalStatus", value: false }]);
    }
  };

  const handleReset = () => {
    setColumnFilters([]);
    setFilterRange({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    });
  };

  return (
    <div>
      <div className="rounded-md flex flex-col gap-5 ">
        <div className="border border-border-primary rounded-lg absolute top-0 right-0">
          <Button
            onClick={() => handleFilter()}
            defaultValue={activeTab}
            className={`${
              activeTab === "전체 판독 상태" ? "bg-bg-teriary" : ""
            }`}
          >
            전체 판독 상태
          </Button>
          <Button
            onClick={() => handleFilter("합격")}
            className={`border-r border-l border-r-border-primary border-l-border-primary ${
              activeTab === "합격" ? "bg-bg-teriary" : ""
            }`}
          >
            합격
          </Button>
          <Button
            onClick={() => handleFilter("불합격")}
            className={`${activeTab === "불합격" ? "bg-bg-teriary" : ""}`}
          >
            불합격
          </Button>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <p className="text-text-quaternary text-[17px] mb-3">
                    검색된 기간에 판독된 이력이 없습니다.
                  </p>
                  <Button variant={"outline"} onClick={handleReset}>
                    검색 초기화
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
