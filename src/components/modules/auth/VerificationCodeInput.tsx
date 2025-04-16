// components/VerificationCodeInput.tsx
import { Input } from '@/components/ui/common/input';
import { Button } from '@/components/ui/common/Button';

type VerificationCodeInputProps = {
  code: string;
  onCodeChange: (code: string) => void;
  onVerify: (e: React.FormEvent) => Promise<void>;
  verified: boolean;
  codeSent: boolean;
};

export function VerificationCodeInput({
  code,
  onCodeChange,
  onVerify,
  verified,
  codeSent,
}: VerificationCodeInputProps) {
  return (
    <div className='flex gap-2'>
      <Input
        id='verificationCode'
        type='text'
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder='인증번호 입력'
        disabled={verified}
      />

      {verified ? (
        <Button size='sm' variant='default' disabled={true}>
          인증완료
        </Button>
      ) : (
        <Button
          size='sm'
          variant='default'
          onClick={onVerify}
          disabled={!codeSent || code.length === 0}
        >
          인증하기
        </Button>
      )}
    </div>
  );
}
