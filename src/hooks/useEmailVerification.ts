import { useState, useEffect } from 'react';
import {
  checkEmailDuplication,
  sendVerificationCode,
  verifyCode,
} from '@/actions/auth-service';
import { formSchema } from '@/schema/auth/index';

type EmailState = {
  email: string;
  verificationCode: string;
  emailChecked: boolean;
  codeSent: boolean;
  verified: boolean;
  error: string;
  countdown: number;
};

export function useEmailVerification(
  onVerified?: (verified: boolean, email?: string) => void,
) {
  const [state, setState] = useState<EmailState>({
    email: '',
    verificationCode: '',
    emailChecked: false,
    codeSent: false,
    verified: false,
    error: '',
    countdown: 0,
  });

  const updateState = (newState: Partial<EmailState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    if (onVerified) {
      onVerified(state.verified, state.email);
    }
  }, [state.verified, state.email, onVerified]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (state.countdown > 0 && !state.verified) {
      timer = setTimeout(() => {
        updateState({ countdown: state.countdown - 1 });
      }, 1000);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [state.countdown, state.verified]);

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
      const result = formSchema
        .pick({ email: true })
        .safeParse({ email: state.email });
      if (!result.success) {
        updateState({ error: result.error.errors[0].message });
        return;
      }

      const response = await checkEmailDuplication(state.email);

      if (response.success) {
        updateState({ emailChecked: true, error: '' });

        try {
          const codeResponse = await sendVerificationCode(state.email);
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
      const response = await sendVerificationCode(state.email);

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
      const response = await verifyCode(state.email, state.verificationCode);

      if (response) {
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

  return {
    ...state,
    setEmail,
    setVerificationCode,
    handleCheckEmail,
    handleResendCode,
    handleVerifyCode,
  };
}
