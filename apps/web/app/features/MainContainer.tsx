'use client';

import Navbar from '@/app/components/navbar/Navbar';
import React, { useState } from 'react';
import { SearchContext } from '@/app/contexts/SearchContext';
import { PersonsContainer } from '@/app/features/persons/PersonsContainer';

export const MainContainer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <Navbar />
      <div className="h-full pt-20">{<PersonsContainer />}</div>
    </SearchContext.Provider>
  );
};
