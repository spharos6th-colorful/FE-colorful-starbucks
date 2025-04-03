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
    className={`whitespace-nowrap text-body3 ${
      isSelected ? 'text-primary-100 font-black' : 'text-[var(--color-text-700)]'
    }`}
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

  // URL 쿼리 파라미터 업데이트 함수
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

// 다중 선택 처리 함수
function handleMultiSelect(params: URLSearchParams, filterId: string, selectedArray: string[], optionId: string) {
  const isSelected = selectedArray.includes(optionId);

  if (isSelected) {
    // 이미 선택된 옵션 제거
    const newSelected = selectedArray.filter((id) => id !== optionId);

    // 선택된 옵션이 없으면 필터 파라미터 삭제, 그렇지 않으면 새 선택 목록으로 업데이트
    if (newSelected.length === 0) {
      params.delete(filterId);
    } else {
      params.set(filterId, newSelected.join(','));
    }
  } else {
    // 새 옵션 추가
    params.set(filterId, [...selectedArray, optionId].join(','));
  }
}

// 단일 선택 처리 함수
function handleSingleSelect(params: URLSearchParams, filterId: string, selectedArray: string[], optionId: string) {
  // 이미 선택된 옵션이면 파라미터 삭제, 그렇지 않으면 새 옵션으로 설정
  if (selectedArray.includes(optionId)) {
    params.delete(filterId);
  } else {
    params.set(filterId, optionId);
  }
}
