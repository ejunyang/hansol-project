import React from "react";
import { DataTable } from "../components/dataTable/DataTable";
import { columns } from "../components/dataTable/columns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PaginationCompo from "@/components/common/PaginationCompo";
import Loading from "@/components/common/Loading";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useDateRangeStore } from "@/store/useDateRangeStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DetectHistory() {
  const queryClient = useQueryClient();
  const { filterRange, setFilterRange } = useDateRangeStore(); // 기본 이번달
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const fetchHistory = async (page: number, range?: DateRange) => {
    const start_date = range?.from ? format(range.from, "yyyy-MM-dd") : "";
    const end_date = range?.to ? format(range.to, "yyyy-MM-dd") : "";

    const response = await fetch(
      `${API_URL}/ui/history?start_date=${start_date}&end_date=${end_date}&page=${page}&list_count=${pageSize}`
    );
    return await response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: [`history`, page, filterRange],
    queryFn: () => fetchHistory(page, filterRange),
  });

  React.useEffect(() => {
    const nextPage = page + 1;
    if (!queryClient.getQueryData([`history`, nextPage, filterRange])) {
      queryClient.prefetchQuery({
        queryKey: [`history`, nextPage, filterRange],
        queryFn: () => fetchHistory(nextPage, filterRange),
      });
    }
  }, [page, queryClient]);

  return (
    <div className="relative">
      {/* 날짜 필터 */}
      <DateRangePicker value={filterRange} onDateChange={setFilterRange} />
      {isLoading ? (
        <Loading />
      ) : data ? (
        <>
          <DataTable
            columns={columns}
            data={data.data}
            filterRange={filterRange}
            setFilterRange={setFilterRange}
          />
          <PaginationCompo
            page={page}
            setPage={setPage}
            totalPage={data.last_page_num}
          />
        </>
      ) : (
        <p className="flex items-center justify-center h-[calc(100vh-350px)] text-text-disable">
          데이터를 불러올 수 없습니다.
        </p>
      )}
    </div>
  );
}
