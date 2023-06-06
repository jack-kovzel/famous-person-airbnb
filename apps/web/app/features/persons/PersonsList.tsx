import { PersonModel } from '@/app/__generated__/types';
import { Person } from '@/app/components/persons/Person';
import React from 'react';

export const PersonsList: React.FC<{ persons: PersonModel[] }> = ({
  persons,
}) => {
  return (
    <ul
      className="
        overflow-y-auto
        sm:h-[75vh]
      "
    >
      {persons.map((person: PersonModel) => (
        <li
          key={person.id}
          className="last:border-b-0 flex justify-between gap-x-6 py-5 border-b-[.5px] hover:border-b-rose-500 hover:cursor-pointer"
        >
          <Person person={person} />
        </li>
      ))}
    </ul>
  );
};
