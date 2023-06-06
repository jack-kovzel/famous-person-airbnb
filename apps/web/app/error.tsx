'use client';

import EmptyState from '@/app/components/EmptyState';
import React from 'react';

interface ErrorStateProps {
  error?: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
