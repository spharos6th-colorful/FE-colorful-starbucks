'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ProductBottomTabBarWrapper } from '@/components/ui/common/product/ProductBottomTabBarWrapper';

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
    <ProductBottomTabBarWrapper title={title}>
      {options.map((option) => (
        <Link
          key={option.filterId}
          href={`${pathname}?${updateQueryParams(option.filterId)}`}
          className={`whitespace-nowrap text-body3 ${
            selectedArray.includes(option.filterId) ? 'text-primary-100 font-black' : 'text-text-700'
          }`}
          scroll={false}
        >
          {option.filterName}
        </Link>
      ))}
    </ProductBottomTabBarWrapper>
  );
}
