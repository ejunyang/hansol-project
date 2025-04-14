import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PropsType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
}

export default function PaginationCompo(props: PropsType) {
  const { page, setPage, totalPage = 1 } = props;

  const getPageNumbers = () => {
    if (totalPage <= 7) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    // 1 2 3 4 ... 43 44 45
    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPage - 2, totalPage - 1, totalPage];
    }

    if (page >= totalPage - 3) {
      return [
        1,
        "...",
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPage];
  };

  return (
    <Pagination className="pt-4 border-t border-border-primary">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          />
        </PaginationItem>
        {getPageNumbers().map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => setPage(pageNumber as number)}
                isActive={pageNumber === page}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
