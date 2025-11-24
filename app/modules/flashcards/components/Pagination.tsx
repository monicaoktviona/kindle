import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { cn } from "~/lib/utils";

interface FlashcardPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export default function FlashcardPagination(props: FlashcardPaginationProps) {
  const createPageArray = () => {
    const pages: (number | string)[] = [];

    const startPage = Math.max(2, props.currentPage - 1);
    const endPage = Math.min(props.totalPages - 1, props.currentPage + 1);

    pages.push(1);

    if (startPage > 2) {
      pages.push("left-ellipsis");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < props.totalPages - 1) {
      pages.push("right-ellipsis");
    }

    if (props.totalPages > 1) pages.push(props.totalPages);

    return pages;
  };

  const pages = createPageArray();

  const handlePageChange = (page: number) => {
    props.setCurrentPage(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              props.currentPage === 1 ? "hidden" : "flex",
              "flex-row items-center justify-center"
            )}
            onClick={() => handlePageChange(props.currentPage - 1)}
          ></PaginationPrevious>
        </PaginationItem>
        {pages.map((p, i) => {
          if (typeof p === "string") {
            return (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={p === props.currentPage}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            className={cn(
              props.currentPage === props.totalPages ? "hidden" : "flex",
              "flex-row items-center justify-center"
            )}
            onClick={() => handlePageChange(props.currentPage + 1)}
          ></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
