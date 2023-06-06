import { createContext } from 'react';
import L from 'leaflet';
import { PersonModel } from '@/app/__generated__/types';

export type MapContextType = {
  readonly mapBounds: L.LatLngBounds | null;
  readonly setMapBounds: (mapBounds: L.LatLngBounds) => void;
  readonly activePerson: PersonModel | null;
  readonly setActivePerson: (persons: PersonModel) => void;
};
export const MapContext = createContext<MapContextType | null>(null);
