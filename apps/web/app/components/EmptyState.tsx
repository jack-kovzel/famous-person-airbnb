import Heading from './Heading';
import React from 'react';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
}) => {
  return (
    <div
      className="
        h-full
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4"></div>
    </div>
  );
};

export default EmptyState;
