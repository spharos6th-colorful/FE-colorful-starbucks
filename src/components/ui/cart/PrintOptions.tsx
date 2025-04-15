import { Caption } from '../common';

type PrintOptionsProps = {
  quantity?: number;
  colorName?: string | null;
  sizeName?: string | null;
  carvingContent?: string | null;
};

export default function PrintOptions({
  options,
}: {
  options: PrintOptionsProps;
}) {
  const optionList = Object.entries(options)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => ({
      key,
      value: key === 'quantity' ? `${value}개` : value,
    }));

  if (optionList.length === 0) return;

  return (
    <Caption className='text-text-900 line-clamp-2 bg-gray-100 px-2 py-1 rounded-sm w-fit gap-2 [display:-webkit-box] [overflow:hidden] [text-overflow:ellipsis] [WebkitLineClamp:2] [WebkitBoxOrient:vertical]'>
      {optionList.map(({ key, value }, index) => (
        <span key={key}>
          {value}
          {index < optionList.length - 1 && <span className='px-1'>/</span>}
        </span>
      ))}
    </Caption>
  );
}
