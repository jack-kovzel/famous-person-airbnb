import { PersonModel } from '@/app/__generated__/types';
import React from 'react';
import { BirthDeathDates } from '@/app/components/persons/BirthDeathDates';
import Image from 'next/image';
import { PopoverModal } from '@/app/components/PopoverModal';

export const Person: React.FC<{ person: PersonModel }> = ({ person }) => {
  const { name, birthPlace, imageUrl, shortDescription } = person;

  const [birthCity] = (
    birthPlace.presentDayPlace ? birthPlace.presentDayPlace : birthPlace.place
  ).split(', ');

  return (
    <>
      <div className="flex gap-x-4">
        <Image
          className="h-12 w-12 flex-none rounded-full bg-gray-50 border-[1px] border-rose-300"
          src={imageUrl}
          alt=""
          width={50}
          height={50}
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {name}
          </p>
          <p className="w-40 mt-1 text-xs leading-5 text-gray-500">
            {shortDescription}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">
          <BirthDeathDates person={person} />
        </p>
        <p className="mt-1 text-xs leading-5 text-gray-500">{birthCity}</p>
        <div className="mt-1 text-xs leading-5 text-gray-500">
          <PopoverModal label={'More'} />
        </div>
      </div>
    </>
  );
};
