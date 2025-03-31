import Image from 'next/image';

interface ProductImageProps {
  imageUrl: string;
  name: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

export default function ProductImage({
  imageUrl,
  name,
  className = '',
  containerClassName = '',
  objectFit = 'contain',
  priority = false,
}: ProductImageProps) {
  return (
    <div className={`relative ${containerClassName}`}>
      <Image src={imageUrl} alt={name} fill className={`object-${objectFit} ${className}`} priority={priority} />
    </div>
  );
}
