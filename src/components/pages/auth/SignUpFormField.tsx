'use client';

import { Input } from '@/components/ui/common/input';

type FormFieldProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  className?: string;
  showError?: boolean;
};

export default function SignUpFormField({
  id,
  type,
  placeholder,
  value,
  onChange,
  error,
  label,
  className,
  showError = true,
}: FormFieldProps) {
  return (
    <div>
      {label && (
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
        </label>
      )}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
      {showError && value !== '' && error && (
        <p className='text-red-500 text-sm mt-1'>{error}</p>
      )}
    </div>
  );
}
