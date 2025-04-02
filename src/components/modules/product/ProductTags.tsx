import { NextFont } from 'next/dist/compiled/@next/font';

interface ProductTagsProps {
  isBest: boolean;
  isNew: boolean;
  isMarkable: boolean;
  caveatFont: NextFont;
}

export default function ProductTags({ isBest, isNew, isMarkable, caveatFont }: ProductTagsProps) {
  return (
    <span>
      {isBest && <span className={`${caveatFont.className} text-error ml-2 text-title3 italic`}>Best</span>}
      {isNew && <span className={`${caveatFont.className} text-primary-100 ml-2 text-title3 italic`}>New</span>}
      {isMarkable && (
        <span className={`${caveatFont.className} text-secondary-200 ml-2 text-title3 italic`}>Limited</span>
      )}
    </span>
  );
}
