import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center ", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-row items-center border border-border-secondary rounded-xl",
      className
    )}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,

  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "first:border-l border-border-secondary",
      "border-l border-border-secondary",
      "last:border-r border-border-secondary",
      buttonVariants({
        variant: isActive ? "pagination" : "ghost",
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5 rounded-none border-none", className)}
    {...props}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.52089 10.8333L10.6042 14.9167C10.7709 15.0833 10.8508 15.2778 10.8438 15.5C10.8369 15.7222 10.7501 15.9167 10.5834 16.0833C10.4167 16.2361 10.2223 16.316 10.0001 16.3229C9.77784 16.3299 9.58339 16.25 9.41673 16.0833L3.91673 10.5833C3.83339 10.5 3.77437 10.4097 3.73964 10.3125C3.70492 10.2153 3.68756 10.1111 3.68756 10C3.68756 9.88889 3.70492 9.78472 3.73964 9.6875C3.77437 9.59028 3.83339 9.5 3.91673 9.41667L9.41673 3.91667C9.56951 3.76389 9.76048 3.6875 9.98964 3.6875C10.2188 3.6875 10.4167 3.76389 10.5834 3.91667C10.7501 4.08333 10.8334 4.28125 10.8334 4.51042C10.8334 4.73958 10.7501 4.9375 10.5834 5.10417L6.52089 9.16667H15.8334C16.0695 9.16667 16.2674 9.24653 16.4271 9.40625C16.5869 9.56597 16.6667 9.76389 16.6667 10C16.6667 10.2361 16.5869 10.434 16.4271 10.5938C16.2674 10.7535 16.0695 10.8333 15.8334 10.8333H6.52089Z"
        fill="#CECFD2"
      />
    </svg>

    <span>이전 페이지</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5 rounded-none border-none", className)}
    {...props}
  >
    <span>다음 페이지</span>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4792 10.8334H4.16671C3.9306 10.8334 3.73268 10.7536 3.57296 10.5938C3.41324 10.4341 3.33337 10.2362 3.33337 10.0001C3.33337 9.76398 3.41324 9.56606 3.57296 9.40634C3.73268 9.24662 3.9306 9.16676 4.16671 9.16676H13.4792L9.39587 5.08342C9.22921 4.91676 9.14935 4.72231 9.15629 4.50009C9.16324 4.27787 9.25004 4.08342 9.41671 3.91676C9.58337 3.76398 9.77782 3.68412 10 3.67717C10.2223 3.67023 10.4167 3.75009 10.5834 3.91676L16.0834 9.41676C16.1667 9.50009 16.2257 9.59037 16.2605 9.68759C16.2952 9.78481 16.3125 9.88898 16.3125 10.0001C16.3125 10.1112 16.2952 10.2154 16.2605 10.3126C16.2257 10.4098 16.1667 10.5001 16.0834 10.5834L10.5834 16.0834C10.4306 16.2362 10.2396 16.3126 10.0105 16.3126C9.78129 16.3126 9.58337 16.2362 9.41671 16.0834C9.25004 15.9168 9.16671 15.7188 9.16671 15.4897C9.16671 15.2605 9.25004 15.0626 9.41671 14.8959L13.4792 10.8334Z"
        fill="#CECFD2"
      />
    </svg>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
