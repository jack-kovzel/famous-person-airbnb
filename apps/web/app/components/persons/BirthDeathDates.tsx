import { PersonModel } from '@/app/__generated__/types';
import React from 'react';

export const BirthDeathDates: React.FC<{ person: PersonModel }> = ({
  person: { birthDate, deathDate },
}) => {
  return (
    <>
      {new Date(birthDate).getFullYear()}-
      {deathDate ? new Date(deathDate).getFullYear() : 'present'}
    </>
  );
};
