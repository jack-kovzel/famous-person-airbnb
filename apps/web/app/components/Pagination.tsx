'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { PaginationArgs } from '@/app/types/PaginationArgs';

type Props = {
  readonly pagination: PaginationArgs;
  readonly onPageChange?: (page: number) => void;
  readonly interactionEnabled: boolean;
  readonly totalCount: number;
};

const calculatePageCount = (totalCount: number, itemsPerPage: number) => {
  return Math.ceil(totalCount / itemsPerPage);
};

export const Pagination: React.FC<Props> = ({
  pagination: { page, numberOfRecords },
  onPageChange,
  interactionEnabled = true,
  totalCount,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(page);

  const onCurrentPageChange = (newPage: number) => {
    onPageChange && onPageChange(newPage);
  };

  const goToNextPage = () => {
    const totalPages = calculatePageCount(totalCount, numberOfRecords);

    const newPage =
      currentPage + 1 > totalPages ? currentPage : currentPage + 1;

    setCurrentPage(newPage);
    onCurrentPageChange(newPage);
  };

  const goToPreviousPage = () => {
    const newPage = currentPage - 1 <= 0 ? 1 : currentPage - 1;

    setCurrentPage(newPage);
    onCurrentPageChange(newPage);
  };

  const onNextPageClick = () => {
    interactionEnabled && goToNextPage();
  };

  const onPreviousPageClick = () => {
    interactionEnabled && goToPreviousPage();
  };

  return (
    <div className="flex items-center justify-between border-gray-200 bg-white py-3">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {(page - 1) * numberOfRecords + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {totalCount > numberOfRecords
                ? numberOfRecords * page > totalCount
                  ? totalCount
                  : numberOfRecords * page
                : totalCount}
            </span>{' '}
            of <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset hover:ring-rose-300 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon
                className="h-5 w-5"
                aria-hidden="true"
                onClick={onPreviousPageClick}
              />
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset hover:ring-rose-300 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className="h-5 w-5"
                aria-hidden="true"
                onClick={onNextPageClick}
              />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
