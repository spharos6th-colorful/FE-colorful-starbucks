'use client';
import { useEffect, useMemo, useState } from 'react';

import Close from '@/assets/icons/common/close.svg';
import type {
  ProductDetailDataType,
  ProductOptionDataType,
} from '@/types/responseDataTypes';
import { Body, Button, SubTitle } from '@/components/ui/common';
import { useModalContext } from '@/context/ModalContext';
import { Modal } from '@/components/ui/common/Modal';
import ColorOptionSelect from '@/components/ui/common/option/ColorOptionSelect';
import SizeOptionSelect from '@/components/ui/common/option/SizeOptionSelect';
import { getProductDetailWithOptions } from '@/actions/product-service';
import { updateCartData } from '@/actions/cart-service';
import QuantityCounter from '@/components/ui/common/option/QuantityCounter';

type CartOptionModalProps = {
  cartId: number;
  productCode: number;
  productDetail: ProductDetailDataType;
  options: ProductOptionDataType;
  quantity: number;
};

export default function CartOptionModal({
  cartId,
  quantity,
  productCode,
  productDetail,
  options,
}: CartOptionModalProps) {
  const [selectOptions, setSelectOptions] = useState<{
    colorId: number | null;
    sizeId: number | null;
  }>({
    colorId: productDetail.colorId,
    sizeId: productDetail.sizeId,
  });
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(quantity);

  const { closeModal } = useModalContext();

  useEffect(() => {
    setSelectOptions({
      colorId: productDetail.colorId,
      sizeId: productDetail.sizeId,
    });
    setUpdatedQuantity(quantity);
  }, [
    productDetail.colorId,
    productDetail.sizeId,
    setSelectOptions,
    quantity,
    setUpdatedQuantity,
  ]);

  const handleClickCloseModal = () => {
    closeModal();
  };

  const handleUpdateCart = async (cartId: number, productCode: number) => {
    const { colorId, sizeId } = selectOptions;
    try {
      const updatedProductDetailCode = await getProductDetailWithOptions(
        productCode,
        sizeId,
        colorId,
      );

      if (!updatedProductDetailCode) return;

      await updateCartData(cartId, {
        productCode,
        productDetailCode: updatedProductDetailCode?.productDetailCode,
        quantity: updatedQuantity,
      });

      closeModal();
    } catch (error) {
      throw error;
    }
  };

  const totalPrice = useMemo(() => {
    return productDetail.price * updatedQuantity;
  }, [updatedQuantity, productDetail.price]);

  return (
    <Modal variant='bottomSheet' className='px-6 pt-6 pb-10'>
      <div className='flex justify-between items-center pb-6'>
        <SubTitle>옵션 변경</SubTitle>
        <button type='button' onClick={handleClickCloseModal}>
          <Close width={20} height={20} className='*:fill-text-900' />
        </button>
      </div>

      <ColorOptionSelect
        selectedOption={selectOptions.colorId}
        setSelectedOption={(value) =>
          setSelectOptions((prev) => ({ ...prev, colorId: value }))
        }
        options={options.color}
      />
      <SizeOptionSelect
        options={options.size}
        selectedOption={selectOptions.sizeId}
        setSelectedOption={(value) =>
          setSelectOptions((prev) => ({ ...prev, sizeId: value }))
        }
      />

      <QuantityCounter
        quantity={updatedQuantity}
        setQuantity={setUpdatedQuantity}
        min={1}
        max={productDetail.inventoryQuantity}
      />

      <div className='pb-6 grid grid-cols-2 items-center'>
        <Body className='w-fit'>
          총 <span className='text-primary-100'>{updatedQuantity}</span> 개
        </Body>
        <SubTitle className='text-right'>
          {totalPrice.toLocaleString()}
          <span className='text-body2'>원</span>
        </SubTitle>
      </div>

      <div className='grid grid-cols-2 gap-2.5'>
        <Button
          type='button'
          variant={'outline'}
          onClick={handleClickCloseModal}
        >
          취소
        </Button>
        <Button
          type='button'
          disabled={
            productDetail.sizeId === selectOptions.sizeId &&
            productDetail.colorId === selectOptions.colorId &&
            quantity === updatedQuantity
          }
          className='w-full'
          onClick={() => handleUpdateCart(cartId, productCode)}
        >
          옵션 수정
        </Button>
      </div>
    </Modal>
  );
}
