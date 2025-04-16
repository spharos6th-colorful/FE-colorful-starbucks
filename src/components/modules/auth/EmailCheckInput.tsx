import { Input } from '@/components/ui/common/input';
import { Button } from '@/components/ui/common/Button';

type EmailCheckInputProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onCheckEmail: (e: React.FormEvent) => Promise<void>;
  disabled: boolean;
};

export function EmailCheckInput({
  email,
  onEmailChange,
  onCheckEmail,
  disabled,
}: EmailCheckInputProps) {
  return (
    <div className='flex gap-2'>
      <Input
        id='email'
        type='email'
        value={email}
        placeholder='이메일'
        onChange={(e) => onEmailChange(e.target.value)}
        disabled={disabled}
      />
      <Button
        size='sm'
        variant='default'
        onClick={onCheckEmail}
        disabled={disabled}
      >
        중복확인
      </Button>
    </div>
  );
}
