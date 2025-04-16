import { Button } from '@/components/ui/common/Button';

type SubmitButtonProps = {
  isSubmitting: boolean;
  disabled: boolean;
};

export default function SubmitButton({
  isSubmitting,
  disabled,
}: SubmitButtonProps) {
  return (
    <Button
      type='submit'
      variant={disabled ? 'disabled' : 'default'}
      size='default'
      className='mt-8 w-full'
      disabled={disabled}
    >
      {isSubmitting ? '처리 중...' : '회원가입'}
    </Button>
  );
}
