'use client';
import React from 'react';

import { ProductOption, SelectedOption } from '@/types/products/productPurchaseTypes';
import { Modal, useModal } from '../common/Modal';
import { ProductOptionsProvider } from '@/context/ProductOptionsContext';
import PurchaseForm from '@/components/modules/product/PurchaseForm';

interface PurchaseModalProps {
  productId: string;
  productPrice: number;
  productOptions: ProductOption[];
}

export default function PurchaseModal({ productId, productPrice, productOptions }: PurchaseModalProps) {
  const { closeModal } = useModal();

  const handleAddToCart = (options: SelectedOption[]) => {
    console.log(`상품 ${productId} 장바구니 추가:`, options);
    closeModal();
  };

  const handlePurchase = (options: SelectedOption[]) => {
    console.log(`상품 ${productId} 즉시구매:`, options);
    closeModal();
  };

  const product = {
    id: productId,
    price: productPrice,
    options: productOptions,
  };

  return (
    <Modal type='purchase-modal' variant='slide' className='max-h-[80vh] overflow-y-auto'>
      <ProductOptionsProvider productId={productId} productPrice={productPrice} productOptions={productOptions}>
        <PurchaseForm product={product} onAddToCart={handleAddToCart} onPurchase={handlePurchase} />
      </ProductOptionsProvider>
    </Modal>
  );
}
