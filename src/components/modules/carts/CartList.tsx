import { cartListDataType } from '@/types/responseDataTypes';
import CartsProduct from './CartsProduct';

interface CartListProps {
  data: cartListDataType[];
  onCheckChange: (id: number, checked: boolean) => void;
}

export default function CartList({ data, onCheckChange }: CartListProps) {
  return (
    <ul>
      {data.map((item) => (
        <CartsProduct key={item.id} item={item} onCheckChange={onCheckChange} />
      ))}
    </ul>
  );
}
