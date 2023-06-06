'use client';

import React, { useMemo, useState } from 'react';
import { PersonsSidePanel } from '@/app/features/persons/PersonsSidePanel';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import { MapContext } from '@/app/contexts/MapContext';
import { PersonModel } from '@/app/__generated__/types';

export const PersonsContainer: React.FC = () => {
  const [bounds, setMapBounds] = useState<L.LatLngBounds | null>(null);
  const [activePerson, setActivePerson] = useState<PersonModel | null>(null);

  const PersonsMapContainer = useMemo(
    () =>
      dynamic(() => import('@/app/features/persons/PersonsMap'), {
        ssr: false,
      }),
    [],
  );

  return (
    <MapContext.Provider
      value={{ mapBounds: bounds, setMapBounds, activePerson, setActivePerson }}
    >
      <div
        className="h-full
          lg:grid
          lg:grid-cols-3
          2xl:grid-cols-4
          "
      >
        {bounds && <PersonsSidePanel mapBounds={bounds} />}
        <div
          className="
            lg:col-span-2
            2xl:col-span-3
            border-b-[1px]
           "
        >
          <PersonsMapContainer />
        </div>
      </div>
    </MapContext.Provider>
  );
};
