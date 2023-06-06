import Avatar from '../Avatar';
import React from 'react';
import { PopoverModal } from '@/app/components/PopoverModal';

const UserMenu: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
          "
        >
          <div className="hidden md:block">
            <Avatar src={null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
