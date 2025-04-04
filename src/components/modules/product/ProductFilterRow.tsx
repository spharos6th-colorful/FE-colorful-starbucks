'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type FilterOption = {
  filterId: string;
  filterName: string;
};

type ProductFilterRowProps = {
  title: string;
  options: FilterOption[];
  filterId: string;
  selectedIds?: string | string[];
  isMultiSelect?: boolean;
};

const getSelectedArray = (selected?: string | string[]): string[] => {
  if (!selected) return [];
  return typeof selected === 'string' ? selected.split(',') : selected;
};

const FilterOption = ({ option, isSelected, href }: { option: FilterOption; isSelected: boolean; href: string }) => (
  <Link
    href={href}
    className={`whitespace-nowrap text-body3 ${isSelected ? 'text-primary-100 font-black' : 'text-text-700'}`}
    scroll={false}
  >
    {option.filterName}
  </Link>
);

export default function ProductFilterRow({
  title,
  options,
  filterId,
  selectedIds,
  isMultiSelect = true,
}: ProductFilterRowProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedArray = getSelectedArray(selectedIds);

  const updateQueryParams = (optionId: string) => {
    const params = new URLSearchParams(searchParams);

    if (isMultiSelect) {
      handleMultiSelect(params, filterId, selectedArray, optionId);
    } else {
      handleSingleSelect(params, filterId, selectedArray, optionId);
    }

    return params.toString();
  };

  return (
    <div className='w-full overflow-x-auto hide-scrollbar py-4 border-b border-stroke-100'>
      <div className='flex min-w-max px-4'>
        <span className='text-body3 text-black w-20'>{title}</span>
        <div className='flex gap-6'>
          {options.map((option) => (
            <FilterOption
              key={option.filterId}
              option={option}
              isSelected={selectedArray.includes(option.filterId)}
              href={`${pathname}?${updateQueryParams(option.filterId)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function handleMultiSelect(params: URLSearchParams, filterId: string, selectedArray: string[], optionId: string) {
  const isSelected = selectedArray.includes(optionId);

  if (isSelected) {
    const newSelected = selectedArray.filter((id) => id !== optionId);

    if (newSelected.length === 0) {
      params.delete(filterId);
    } else {
      params.set(filterId, newSelected.join(','));
    }
  } else {
    params.set(filterId, [...selectedArray, optionId].join(','));
  }
}

function handleSingleSelect(params: URLSearchParams, filterId: string, selectedArray: string[], optionId: string) {
  if (selectedArray.includes(optionId)) {
    params.delete(filterId);
  } else {
    params.set(filterId, optionId);
  }
}
