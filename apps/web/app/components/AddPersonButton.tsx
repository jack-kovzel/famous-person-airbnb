import React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';

const AddPersonButton: React.FC<{
  readonly onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <a
      href="#"
      className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset hover:ring-rose-300 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      onClick={onClick}
    >
      <span className="sr-only">Add to index</span>
      <PlusIcon className="h-5 w-5" aria-hidden="true" />
      <span>Add person to index</span>
    </a>
  );
};

export default AddPersonButton;
