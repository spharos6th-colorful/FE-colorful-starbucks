// EmailForm.tsx
'use client';

import { CountdownTimer } from '@/components/modules/auth/CountdownTimer';
import { EmailCheckInput } from '@/components/modules/auth/EmailCheckInput';
import { VerificationCodeInput } from '@/components/modules/auth/VerificationCodeInput';
import { useEmailVerification } from '@/hooks/useEmailVerification';

interface EmailFormProps {
  onVerified?: (verified: boolean, email?: string) => void;
}

export default function EmailForm({ onVerified }: EmailFormProps) {
  const {
    email,
    verificationCode,
    emailChecked,
    codeSent,
    verified,
    countdown,
    error,
    setEmail,
    setVerificationCode,
    handleCheckEmail,
    handleResendCode,
    handleVerifyCode,
  } = useEmailVerification(onVerified);

  return (
    <div>
      <div className='mb-2'>
        <EmailCheckInput
          email={email}
          onEmailChange={setEmail}
          onCheckEmail={handleCheckEmail}
          disabled={emailChecked}
        />
      </div>

      {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

      {emailChecked && (
        <>
          <VerificationCodeInput
            code={verificationCode}
            onCodeChange={setVerificationCode}
            onVerify={handleVerifyCode}
            verified={verified}
            codeSent={codeSent}
          />

          {codeSent && !verified && (
            <CountdownTimer countdown={countdown} onResend={handleResendCode} />
          )}
        </>
      )}

      {verified && (
        <p className='text-green-500 text-sm mt-1'>
          이메일이 성공적으로 인증되었습니다.
        </p>
      )}
    </div>
  );
}
