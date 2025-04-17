import type { ColorOptionType } from '@/types/responseDataTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { Body } from '../Typography';

type ColorOptionSelectProps = {
  selectedOption: number | null;
  setSelectedOption: (sizeId: number) => void;
  options: ColorOptionType[];
};

export default function ColorOptionSelect({
  selectedOption,
  setSelectedOption,
  options,
}: ColorOptionSelectProps) {
  const initSelectedOption = options.find(
    (item) => item.colorId === selectedOption,
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
            defaultValue={initSelectedOption?.colorId}
            placeholder={initSelectedOption?.colorName}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ colorId, colorName }) => (
            <SelectItem key={colorId} value={colorId.toString()}>
              {colorName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
