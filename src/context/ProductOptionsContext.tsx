'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { ProductOptionType, SelectedOption, SelectedOptionValue } from '@/types/products/productPurchaseTypes';
import { useCallback } from 'react';

interface ProductOptionsContextType {
  currentSelections: SelectedOptionValue;
  quantity: number;
  selectedOptions: SelectedOption[];
  productPrice: number;

  setOptionValue: (optionName: string, value: string) => void;
  setQuantity: (quantity: number) => void;
  removeOption: (optionId: string) => void;
  updateOptionQuantity: (optionId: string, newQuantity: number) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  resetSelections: () => void;

  isOptionComplete: () => boolean;
}

const ProductOptionsContext = createContext<ProductOptionsContextType | undefined>(undefined);

interface ProductOptionsProviderProps {
  children: ReactNode;
  productId: string;
  productPrice: number;
  productOptions: ProductOptionType[];
}

export function ProductOptionsProvider({
  children,
  productId,
  productOptions,
  productPrice,
}: ProductOptionsProviderProps) {
  console.log(productId); // 나중에 지울 예정

  // 현재 선택 중인 옵션 값들
  const [currentSelections, setCurrentSelections] = useState<SelectedOptionValue>({});
  const [quantity, setQuantity] = useState(1);

  // 확정된 옵션 목록
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  // 모든 필수 옵션이 선택되었는지 확인
  const isOptionComplete = useCallback(() => {
    return productOptions.every((option) => currentSelections[option.name] !== undefined);
  }, [currentSelections, productOptions]);

  // 옵션 값 변경
  const setOptionValue = (optionName: string, value: string) => {
    const newSelections = { ...currentSelections, [optionName]: value };

    // 이미 동일한 옵션 조합이 있는지 확인
    const existingOption = findExistingOption(newSelections);
    if (existingOption) {
      setQuantity(existingOption.quantity);
    } else {
      setQuantity(1);
    }

    setCurrentSelections(newSelections);
  };

  // 옵션 값에 해당하는 기존 옵션 찾기
  const findExistingOption = (optionValues: SelectedOptionValue) => {
    // 모든 옵션이 채워졌는지 확인
    const allOptionsSelected = productOptions.every((option) => optionValues[option.name] !== undefined);

    if (!allOptionsSelected) return null;

    // 동일한 옵션 조합 찾기
    return selectedOptions.find((option) => {
      return productOptions.every(
        (productOption) => option.options[productOption.name] === optionValues[productOption.name],
      );
    });
  };

  // 현재 선택된 옵션으로 고유 ID 생성
  const generateOptionId = (optionValues: SelectedOptionValue) => {
    return Object.entries(optionValues)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}-${value}`)
      .join('_');
  };

  // 모든 옵션 선택 시 자동으로 목록에 추가
  useEffect(() => {
    if (isOptionComplete()) {
      const optionId = generateOptionId(currentSelections);
      const existingIndex = selectedOptions.findIndex((opt) => generateOptionId(opt.options) === optionId);

      if (existingIndex >= 0) {
        // 이미 있는 옵션이면 수량만 업데이트
        const updatedOptions = [...selectedOptions];
        updatedOptions[existingIndex].quantity = quantity;
        setSelectedOptions(updatedOptions);
      } else {
        // 새 옵션 추가
        const newOption: SelectedOption = {
          id: optionId,
          options: { ...currentSelections },
          quantity,
        };
        setSelectedOptions([...selectedOptions, newOption]);

        // 새 옵션이 추가되면 초기화
        setCurrentSelections({});
        setQuantity(1);
      }
    }
  }, [currentSelections, quantity, isOptionComplete, selectedOptions]);

  // 옵션 제거
  const removeOption = (optionId: string) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt.id !== optionId));
  };

  // 옵션 수량 업데이트
  const updateOptionQuantity = (optionId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setSelectedOptions(
      selectedOptions.map((opt) => {
        if (opt.id === optionId) {
          return { ...opt, quantity: newQuantity };
        }
        return opt;
      }),
    );
  };

  // 수량 증가
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // 수량 감소
  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  // 선택 초기화
  const resetSelections = () => {
    setCurrentSelections({});
    setQuantity(1);
  };

  return (
    <ProductOptionsContext.Provider
      value={{
        currentSelections,
        quantity,
        selectedOptions,
        productPrice,

        setOptionValue,
        setQuantity,
        removeOption,
        updateOptionQuantity,
        increaseQuantity,
        decreaseQuantity,
        resetSelections,
        isOptionComplete,
      }}
    >
      {children}
    </ProductOptionsContext.Provider>
  );
}

export function useProductOptions() {
  const context = useContext(ProductOptionsContext);
  if (context === undefined) {
    throw new Error('useProductOptions must be used within a ProductOptionsProvider');
  }
  return context;
}
