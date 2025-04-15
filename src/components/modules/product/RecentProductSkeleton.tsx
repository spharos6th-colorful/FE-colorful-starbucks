import React from 'react';

export default function RecentProductSkeleton() {
  return (
    <article className='flex items-center py-4 animate-pulse'>
      <div className='w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4 flex-shrink-0'></div>
      <div className='flex-1'>
        <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
        <div className='h-5 bg-gray-200 rounded w-1/4'></div>
      </div>
    </article>
  );
}
