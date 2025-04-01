import Link from 'next/link';

interface AddressPickerButtonProps {
  href: string;
  text: string;
  className: string;
}

function AddressPickerButton({ href, text, className }: AddressPickerButtonProps) {
  return (
    <Link href={href} className={`text-caption2 ${className}`}>
      {text}
    </Link>
  );
}

export default AddressPickerButton;
