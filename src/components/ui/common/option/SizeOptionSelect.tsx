import type { SizeOptionType } from '@/types/responseDataTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { Body } from '../Typography';

type SizeOptionSelectProps = {
  selectedOption: number | null;
  setSelectedOption: (sizeId: number) => void;
  options: SizeOptionType[];
};

export default function SizeOptionSelect({
  selectedOption,
  setSelectedOption,
  options,
}: SizeOptionSelectProps) {
  const initSelectedOption = options.find(
    (item) => item.sizeId === selectedOption,
  );

  if (!initSelectedOption || options.length === 0) {
    return null;
  }

  return (
    <>
      <Body className='pb-4'>색상</Body>
      <Select
        onValueChange={(value: string) => setSelectedOption(Number(value))}
      >
        <SelectTrigger className='w-full'>
          <SelectValue
            className='w-full'
            defaultValue={initSelectedOption?.sizeId}
            placeholder={initSelectedOption?.sizeName}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ sizeId, sizeName }) => (
            <SelectItem key={sizeId} value={sizeId.toString()}>
              {sizeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
