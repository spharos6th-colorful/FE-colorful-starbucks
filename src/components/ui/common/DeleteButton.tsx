import { X } from 'lucide-react';
import DeleteX from '@/assets/icon/carts/DeleteButton.svg';

interface DeleteButtonProps {
  onClick: () => void;
  id: number;
}

function DeleteButton({ onClick, id }: DeleteButtonProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }
      onClick();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };
  return (
    <button onClick={handleDelete}>
      <DeleteX />
    </button>
  );
}

export default DeleteButton;
