'use client';
import {
  checkEmailDuplication,
  sendVerificationCode,
  verifyCode,
} from '@/actions/auth-service';
import { Button } from '@/components/ui/common';
import { Input } from '@/components/ui/common/input';
import { formSchema } from '@/schema/auth/index';
import { useEffect, useState } from 'react';

type EmailState = {
  email: string;
  verificationCode: string;
  emailChecked: boolean;
  codeSent: boolean;
  verified: boolean;
  error: string;
  countdown: number;
};

interface EmailFormProps {
  onVerified?: (verified: boolean, email?: string) => void;
}

export default function EmailForm({ onVerified }: EmailFormProps) {
  const [state, setState] = useState<EmailState>({
    email: '',
    verificationCode: '',
    emailChecked: false,
    codeSent: false,
    verified: false,
    error: '',
    countdown: 0,
  });

  const {
    email,
    verificationCode,
    emailChecked,
    codeSent,
    verified,
    countdown,
    error,
  } = state;

  const updateState = (newState: Partial<EmailState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    if (onVerified) {
      onVerified(verified, email);
    }
  }, [verified, email, onVerified]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (countdown > 0 && !verified) {
      timer = setTimeout(() => {
        updateState({ countdown: countdown - 1 });
      }, 1000);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [countdown, verified]);

  const setEmail = (email: string) => {
    updateState({ email });
  };

  const setVerificationCode = (verificationCode: string) => {
    updateState({ verificationCode });
  };

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    updateState({ error: '' });

    try {
      const result = formSchema.pick({ email: true }).safeParse({ email });
      if (!result.success) {
        updateState({ error: result.error.errors[0].message });
        return;
      }

      const response = await checkEmailDuplication(email);

      if (response.success) {
        updateState({ emailChecked: true, error: '' });

        try {
          const codeResponse = await sendVerificationCode(email);
          if (codeResponse.success) {
            updateState({ codeSent: true, countdown: 360 });
          } else {
            updateState({ error: codeResponse.message });
          }
        } catch (err) {
          console.log(err);
          updateState({ error: '인증번호 발송 중 오류가 발생했습니다.' });
        }
      } else {
        updateState({ error: response.message });
      }
    } catch (err) {
      console.log(err);
      updateState({ error: '이메일 확인 중 오류가 발생했습니다.' });
    }
  };

  const handleResendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    updateState({ error: '' });

    try {
      const response = await sendVerificationCode(email);

      if (response.success) {
        updateState({ countdown: 360 });
      } else {
        updateState({ error: response.message });
      }
    } catch (err) {
      console.log(err);
      updateState({ error: '인증번호 재발송 중 오류가 발생했습니다.' });
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    updateState({ error: '' });
    try {
      const response = await verifyCode(email, verificationCode);

      if (response) {
        // 한 번에 여러 상태 업데이트
        updateState({
          verified: true,
          countdown: 0,
        });
        alert('이메일 인증 완료');
      } else {
        updateState({ error: '인증코드가 일치하지 않습니다.' });
      }
    } catch (err) {
      console.log(err);
      updateState({ error: '인증번호 확인 중 오류가 발생했습니다.' });
    }
  };

  return (
    <div>
      <div className='flex gap-2 mb-2'>
        <Input
          id='email'
          type='email'
          value={email}
          placeholder='이메일'
          onChange={(e) => setEmail(e.target.value)}
          disabled={emailChecked}
        />
        <Button
          size='sm'
          variant='default'
          onClick={handleCheckEmail}
          disabled={emailChecked}
        >
          중복확인
        </Button>
      </div>

      {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

      {emailChecked && (
        <>
          <div className='flex gap-2'>
            <Input
              id='verificationCode'
              type='text'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
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
                onClick={handleVerifyCode}
                disabled={!codeSent || verificationCode.length === 0}
              >
                인증하기
              </Button>
            )}
          </div>

          {codeSent && !verified && (
            <div className='flex justify-between mt-1'>
              <p className='text-sm text-black font-bold'>
                {countdown > 0
                  ? `${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`
                  : '시간 만료'}
              </p>
              {countdown === 0 && (
                <button
                  onClick={handleResendCode}
                  type='button'
                  className='text-sm text-blue-500 hover:underline'
                >
                  인증번호 재발송
                </button>
              )}
            </div>
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
