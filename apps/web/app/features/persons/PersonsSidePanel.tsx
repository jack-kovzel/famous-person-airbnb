import React, { useContext, useEffect, useState } from 'react';
import { PersonsList } from '@/app/features/persons/PersonsList';
import EmptyState from '@/app/components/EmptyState';
import Loader from '@/app/components/Loader';
import ErrorState from '@/app/error';
import { Pagination } from '@/app/components/Pagination';
import { PaginationArgs } from '@/app/types/PaginationArgs';
import { useAll } from '@/app/features/persons/graphql/__generated__/AvailableServiceDates.query';
import L from 'leaflet';
import { SearchContext, SearchContextType } from '@/app/contexts/SearchContext';
import { getVariables } from '@/app/features/persons/graphql/helpers/AllPersonsQueryHelper';
import AddPersonButton from '@/app/components/AddPersonButton';
import dynamic from 'next/dynamic';

const PAGINATION_NUMBER_OF_RECORDS = 20;

const AddPersonModal = dynamic(
  () => import('@/app/components/modals/AddPersonModal'),
);

export const PersonsSidePanel: React.FC<{
  readonly mapBounds: L.LatLngBounds;
}> = ({ mapBounds }) => {
  const onPaginationPageChange = (newPage: number) => {
    setPagination({
      numberOfRecords: PAGINATION_NUMBER_OF_RECORDS,
      page: newPage,
    });
  };
  const [pagination, setPagination] = useState<PaginationArgs>({
    page: 1,
    numberOfRecords: PAGINATION_NUMBER_OF_RECORDS,
  });

  const [isAddPersonModalOpen, setPersonModalIsOpen] = useState(false);

  const closeAddPersonModal = () => setPersonModalIsOpen(false);
  const openAddPersonModal = () => setPersonModalIsOpen(true);

  const onSubmitAddPersonModal = () => {};

  useEffect(
    () =>
      setPagination({
        numberOfRecords: PAGINATION_NUMBER_OF_RECORDS,
        page: 1,
      }),
    [mapBounds],
  );

  const { searchQuery } = useContext(SearchContext) as SearchContextType;

  const {
    data,
    loading: isLoading,
    error,
  } = useAll({
    variables: getVariables({
      mapBounds,
      pagination,
      searchQuery,
    }),
  });

  const isError = !!error;
  const { items: persons, totalCount } = data?.all || {
    totalCount: 0,
    items: [],
  };

  if (!mapBounds || isLoading) {
    return (
      <div className="border-r-[1px] border-b-[1px]">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-r-[1px] border-b-[1px]">
        <ErrorState />
      </div>
    );
  }

  if (persons.length === 0) {
    return (
      <div className="border-r-[1px] border-b-[1px]">
        <EmptyState
          title={'Nothing to show here'}
          subtitle={'Try to change your search criteria or zoom out the map.'}
        />
      </div>
    );
  }

  return (
    <div className="border-r-[1px] border-b-[1px] p-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-1 justify-self-center">
          <AddPersonButton onClick={openAddPersonModal} />
          {isAddPersonModalOpen && (
            <AddPersonModal
              isOpen={isAddPersonModalOpen}
              onClose={closeAddPersonModal}
              onSubmit={onSubmitAddPersonModal}
              actionLabel={'Add'}
              secondaryAction={closeAddPersonModal}
              secondaryActionLabel={'Close'}
            />
          )}
        </div>
        <div className="col-span-1 border-t-[1px] border-b-[1px]">
          <PersonsList persons={persons} />
        </div>
        <div className="col-span-1">
          <div className="pt-15">
            <Pagination
              totalCount={totalCount}
              interactionEnabled={!isLoading}
              pagination={pagination}
              onPageChange={onPaginationPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
