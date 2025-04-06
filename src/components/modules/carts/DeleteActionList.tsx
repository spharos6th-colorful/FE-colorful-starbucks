'use client';
import { deleteAllProducts, deletedSelectedProducts } from '@/actions/cart-service';
import { ActionList } from '@/components/ui/common';

interface DeleteActionListProps {
  id: number[];
}
function DeleteActionList({ id }: DeleteActionListProps) {
  const handleDelete = async (id: number[]) => {
    await deletedSelectedProducts(id);
  };

  const accessToken = 'ddd';
  const handleAllDelete = async (accessToken: string) => {
    await deleteAllProducts(accessToken);
  };

  return (
    <ActionList.Group className='[&_li]:!text-extra [&_button]:!cursor-pointer'>
      <ActionList.Item className='border-r-2 pr-[10px] text-primary-100'>
        <button onClick={() => handleDelete(id)}>선택 삭제</button>
      </ActionList.Item>
      <ActionList.Item className='pl-[10px] text-text-700'>
        <button onClick={() => handleAllDelete(accessToken)}>전체 삭제</button>
      </ActionList.Item>
    </ActionList.Group>
  );
}

export default DeleteActionList;
