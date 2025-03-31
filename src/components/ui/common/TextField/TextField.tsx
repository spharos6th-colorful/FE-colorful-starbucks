import { Input } from '../input';
import { Label } from '../label';

export interface TextFieldProps extends React.ComponentProps<'input'> {
  label: string;
  required?: boolean;
  error?: string;
}

export default function TextField({ label, required, error }: TextFieldProps) {
  return (
    <div className='relative pt-4'>
      <Input id='search-input' placeholder=' ' className='peer block w-full px-2 text-body3 text-gray-900' />
      <Label
        htmlFor='search-input'
        className='absolute px-2 left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-black'
      >
        <span>{label}</span>
        {required && <span className='text-error'>*</span>}
      </Label>
      {error && (
        <div className='pt-2 pl-2'>
          <p className='text-caption3 text-error'>{error}</p>
        </div>
      )}
    </div>
  );
}
