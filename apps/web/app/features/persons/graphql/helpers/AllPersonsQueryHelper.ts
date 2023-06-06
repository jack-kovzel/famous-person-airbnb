import { AllVariables } from '@/app/features/persons/graphql/__generated__/AvailableServiceDates.query';
import L from 'leaflet';
import { PaginationArgs } from '@/app/types/PaginationArgs';

type GetVariablesArgs = {
  readonly searchQuery: string | null;
  readonly mapBounds: L.LatLngBounds;
  readonly pagination: PaginationArgs;
};

export const getVariables = ({
  mapBounds,
  searchQuery,
  pagination,
}: GetVariablesArgs): AllVariables => {
  const topLeft = mapBounds.getNorthWest(); // Top-left coordinate
  const bottomRight = mapBounds.getSouthEast(); // Bottom-right coordinate

  return {
    filterBy: {
      ...(searchQuery ? { searchString: searchQuery } : {}),
      location: {
        topLeft: {
          lat: topLeft.lat,
          lon: topLeft.lng,
        },
        bottomRight: {
          lat: bottomRight.lat,
          lon: bottomRight.lng,
        },
      },
    },
    pagination: {
      numberOfRecords: pagination.numberOfRecords,
      page: pagination.page,
    },
  };
};
