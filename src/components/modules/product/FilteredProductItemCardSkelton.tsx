import React from 'react';

export default function FilteredProductItemCardSkelton() {
  return (
    <div className='w-full animate-pulse'>
      <div className='aspect-square w-full bg-gray-200 rounded-[4px]'></div>
      <div className='h-4 bg-gray-200 rounded my-3 w-3/4'></div>
      <div className='h-4 bg-gray-200 rounded w-1/2'></div>
    </div>
  );
}
