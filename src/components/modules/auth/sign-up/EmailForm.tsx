'use client';

import { checkEmailDuplication, sendVerificationCode, verifyCode } from '@/actions/auth-service/sign-up';
import { Button } from '@/components/ui/common';
import { Input } from '@/components/ui/common/input';
import useDebounce from '@/hooks/useDebounce';
import { formatTime } from '@/lib/auth/sign-up/util';
import formSchema from '@/schema/auth/sign-up';
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

function EmailForm() {
  // 상태 변수 초기화
  const [state, setState] = useState<EmailState>({
    email: '',
    verificationCode: '',
    emailChecked: false,
    codeSent: false,
    verified: false,
    error: '',
    countdown: 0,
  });
  const { email, verificationCode, emailChecked, codeSent, verified, error, countdown } = state;
  const emailDebouncedValue = useDebounce<string>(state.email, 600);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (countdown > 0) {
      timer = setTimeout(() => {
        updateState({ countdown: countdown - 1 });
      }, 1000);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [countdown]);

  //  updateState  업데이트 상태
  const updateState = (newState: Partial<EmailState>) => {
    setState((prevstate) => ({ ...prevstate, ...newState }));
  };

  const setEmail = (email: string) => {
    updateState({ email });
  };

  // EmailCheck 핸들러
  const handleCheckEmail = async (value: string) => {
    try {
      const result = formSchema.pick({ email: true }).safeParse({ email });
      setEmail(value);
      if (!result.success) {
        updateState({ error: result.error.errors[0].message });
        return;
      }
      const response = await checkEmailDuplication(emailDebouncedValue);

      if (response.success) {
        updateState({ emailChecked: true });
      } else {
        updateState({ error: response.message });
      }
    } catch (err) {
      updateState({ error: '이메일 확인 중 오류가 발생했습니다.' });
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    updateState({ error: '' });

    try {
      const response = await sendVerificationCode(email);

      if (response.success) {
        updateState({ codeSent: true, countdown: 180 });
      } else {
        updateState({ error: response.message });
      }
    } catch (err) {
      updateState({ error: '인증번호 발송 중 오류가 발생했습니다.' });
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    updateState({ error: '' });
    try {
      const response = await verifyCode(email, verificationCode);

      if (response.success) {
        updateState({ verified: true });
      } else {
        updateState({ error: response.message });
      }
    } catch (err) {
      updateState({ error: '인증번호 확인 중 오류가 발생했습니다.' });
    }
  };

  const handleVerificationButtonClick = (e: React.FormEvent) => {
    if (codeSent && countdown === 0) {
      handleSendCode(e);
    } else if (codeSent) {
      handleVerifyCode(e);
    } else {
      handleSendCode(e);
    }
  };

  const setVerificationCode = (verificationCode: string) => {
    updateState({ verificationCode });
  };

  const getTimmer = () => {
    if (!verified) {
      return formatTime(countdown);
    }
    return '';
  };

  return (
    <section>
      <div className=' flex items-center'>
        <Input
          id='email'
          type='email'
          value={email}
          placeholder='이메일'
          onChange={(e) => handleCheckEmail(e.target.value)}
          disabled={codeSent}
        />
        <Button onClick={handleVerificationButtonClick} disabled={codeSent} className='py-[2px]'>
          전송
        </Button>
      </div>
      {codeSent && (
        <>
          <div>{getTimmer()}</div>
          <div className='flex pt-[15px] items-center'>
            <Input
              id='verificationCode'
              type='text'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder='인증번호 입력'
              disabled={verified}
            />
            <Button onClick={handleVerificationButtonClick} disabled={verified}>
              확인
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
export default EmailForm;
