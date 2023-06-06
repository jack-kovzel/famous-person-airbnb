'use client';

import L from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { useContext, useEffect, useState } from 'react';
import Loader from '@/app/components/Loader';
import { useAll } from '@/app/features/persons/graphql/__generated__/AvailableServiceDates.query';
import { BirthDeathDates } from '@/app/components/persons/BirthDeathDates';
import { PersonModel } from '@/app/__generated__/types';
import ErrorState from '@/app/error';
import { MapContext, MapContextType } from '@/app/contexts/MapContext';
import { SearchContext, SearchContextType } from '@/app/contexts/SearchContext';
import { getVariables } from '@/app/features/persons/graphql/helpers/AllPersonsQueryHelper';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const PersonsMarker: React.FC<{ person: PersonModel }> = ({ person }) => {
  const {
    id,
    name,
    birthPlace: {
      place,
      location: { lon, lat },
    },
  } = person;

  const icon: L.Icon = new L.Icon({
    iconUrl: 'https://i.pravatar.cc/30?u=' + id,
    iconSize: [30, 30],
    className: 'rounded-full border-rose-300 border-[1px]',
  });

  return (
    <Marker key={id} position={[lat, lon]} title={name} icon={icon}>
      <Popup>
        <div className={'flex justify-between gap-2'}>
          <div>
            <b>{name}</b> <br />
            <BirthDeathDates person={person} />
            <br />
            {place}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

const PersonsMarkers: React.FC<{
  readonly mapBounds: L.LatLngBounds;
  readonly onLoading?: (isLoading: boolean) => void;
  readonly onError?: (isError: boolean) => void;
}> = ({ onError, onLoading, mapBounds }) => {
  const { searchQuery } = useContext(SearchContext) as SearchContextType;

  const {
    data,
    loading: isLoading,
    error,
  } = useAll({
    variables: getVariables({
      mapBounds,
      searchQuery,
      pagination: {
        page: 1,
        numberOfRecords: 100,
      },
    }),
  });

  useEffect(() => {
    onLoading && onLoading(isLoading);
    onError && onError(!!error);
  }, [isLoading, error, onLoading, onError]);

  const { items: persons } = data?.all || {
    totalCount: 0,
    items: [],
  };

  return (
    <>
      {persons.map((person) => (
        <PersonsMarker key={person.id} person={person} />
      ))}
    </>
  );
};

const PersonsMap: React.FC<{
  readonly isMapReady: boolean;
  readonly reFetchOnMove?: boolean;
}> = ({ isMapReady, reFetchOnMove = true }) => {
  const { mapBounds, setMapBounds } = useContext(MapContext) as MapContextType;

  const doRefetch = () => {
    reFetchOnMove && setMapBounds(map.getBounds());
  };

  const map = useMapEvents({
    dragend: () => doRefetch(),
    zoomend: () => doRefetch(),
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (isMapReady) {
      setIsLoading(true);
      setIsError(false);
      setMapBounds(map.getBounds());
    }
  }, [isMapReady, map, setMapBounds]);

  const onLoadPersonsError = (error: boolean) => {
    setIsError(error);
  };
  const onLoadPersons = (loading: boolean) => {
    setIsLoading(loading);
  };
  if (isError) {
    return (
      <div className="border-r-[1px] shadow-md h-full">
        <ErrorState />
      </div>
    );
  }

  return (
    <>
      <TileLayer url={url} attribution={attribution} />
      {isLoading && <Loader />}
      {isMapReady && mapBounds && (
        <PersonsMarkers
          mapBounds={mapBounds}
          onError={onLoadPersonsError}
          onLoading={onLoadPersons}
        />
      )}
    </>
  );
};

const PersonsMapContainer: React.FC = () => {
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  const onMapReady = () => setIsMapReady(true);

  return (
    <MapContainer
      center={[51, -0.09]}
      zoom={4}
      scrollWheelZoom={true}
      className="h-full"
      whenReady={onMapReady}
    >
      <PersonsMap isMapReady={isMapReady} />
    </MapContainer>
  );
};

export default PersonsMapContainer;
