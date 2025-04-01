import Link from 'next/link';

interface Address {
  memberAddressUuid: string;
  addressNickname: string;
  zonecode: string;
  address: string;
  detailAddress: string;
  isDefaultAddress: boolean;
}

interface AddressPickerButtonProps {
  address?: Address | null;
}

function AddressPickerButton({ address }: AddressPickerButtonProps) {
  const buttonText = address ? '배송지 변경' : '배송지 추가';
  const href = address ? '/delivery/selection' : '/delivery/create';
  const className = address ? 'text-primary-100' : 'text-secondary-300';
  return (
    <Link href={href} className={`text-caption2 ${className}`}>
      {buttonText}
    </Link>
  );
}

export default AddressPickerButton;
