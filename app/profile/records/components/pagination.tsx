// components/pagination.tsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

export function PaginationComp({
  pageIndex,
  pageSize,
  total,
  onPageChange,
}: {
  pageIndex: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <Pagination className={total > pageSize ? "" : "invisible"}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => pageIndex > 0 && onPageChange(pageIndex - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === pageIndex}
              onClick={() => onPageChange(i)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              pageIndex < totalPages - 1 && onPageChange(pageIndex + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
