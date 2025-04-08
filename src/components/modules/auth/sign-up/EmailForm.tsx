'use client';
import { checkEmailDuplication, sendVerificationCode, verifyCode } from '@/actions/auth-service/sign-up';
import { Button } from '@/components/ui/common';
import { Input } from '@/components/ui/common/input';
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

  const updateState = (newState: Partial<EmailState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

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

  const setEmail = (email: string) => {
    updateState({ email });
  };

  const setVerificationCode = (verificationCode: string) => {
    updateState({ verificationCode });
  };

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = formSchema.pick({ email: true }).safeParse({ email });
      if (!result.success) {
        updateState({ error: result.error.errors[0].message });
        return;
      }
      const response = await checkEmailDuplication(email);

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
        updateState({ codeSent: true, countdown: 360 });
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

  const getVerificationButtonText = () => {
    if (codeSent) {
      if (countdown > 0) return `확인 (${countdown}초)`;
      return '재전송';
    }
    return '인증번호 전송';
  };

  return (
    <form>
      <Input
        id='email'
        type='email'
        value={email}
        placeholder='이메일'
        onChange={(e) => setEmail(e.target.value)}
        disabled={emailChecked}
      />
      <Button onClick={handleCheckEmail} disabled={emailChecked}>
        중복확인인
      </Button>
      {emailChecked && (
        <>
          <Input
            id='verificationCode'
            type='text'
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder='인증번호 입력'
            disabled={verified}
          />

          <Button onClick={handleVerificationButtonClick} disabled={verified}>
            {getVerificationButtonText()}
          </Button>
        </>
      )}
    </form>
  );
}

export default EmailForm;
