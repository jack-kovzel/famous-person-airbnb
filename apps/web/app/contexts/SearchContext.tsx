import { createContext } from 'react';

export type SearchContextType = {
  readonly searchQuery: string | null;
  readonly setSearchQuery: (searchQuery: string) => void;
};
export const SearchContext = createContext<SearchContextType | null>(null);
