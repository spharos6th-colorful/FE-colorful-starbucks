'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/common/input';
import { Button } from '@/components/ui/common/Button';
import EmailForm from './EmailForm';
import { signUp } from '@/actions/auth-service';
import { signupSchema } from '@/schema/auth';
import { useRouter } from 'next/navigation';

type SignUpFormState = {
  email: string;
  password: string;
  passwordConfirm: string;
  memberName: string;
  phoneNumber: string;
  nickName: string;
  memberBirth: string;
  gender: 'M' | 'W';
};

type FormErrors = {
  [K in keyof SignUpFormState]?: string;
};

export default function SignUpInputForm() {
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [formData, setFormData] = useState<SignUpFormState>({
    email: '',
    password: '',
    passwordConfirm: '',
    memberName: '',
    phoneNumber: '',
    nickName: '',
    memberBirth: '',
    gender: 'M',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  useEffect(() => {
    const requiredFields = [
      formData.email,
      formData.password,
      formData.passwordConfirm,
      formData.memberName,
      formData.phoneNumber,
      formData.nickName,
      formData.memberBirth,
    ];

    const allFilled = requiredFields.every(
      (field) => field && field.trim && field.trim() !== '',
    );

    setAllFieldsFilled(allFilled);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === 'passwordConfirm') {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: '비밀번호가 일치하지 않습니다.',
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.passwordConfirm;
          return newErrors;
        });
      }
    } else {
      try {
        switch (id) {
          case 'password':
            if (value.length < 8) {
              throw new Error('비밀번호는 8자 이상이어야 합니다.');
            }
            if (!/.*[!@#$%^&*].*/.test(value)) {
              throw new Error('특수문자를 포함해야 합니다.');
            }

            if (
              formData.passwordConfirm &&
              formData.passwordConfirm !== value
            ) {
              setErrors((prev) => ({
                ...prev,
                passwordConfirm: '비밀번호가 일치하지 않습니다.',
              }));
            } else if (formData.passwordConfirm) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.passwordConfirm;
                return newErrors;
              });
            }
            break;

          case 'memberName':
            if (value.length < 2) {
              throw new Error('이름은 2자 이상이어야 합니다.');
            }
            break;

          case 'phoneNumber':
            if (!/^\d{10,11}$/.test(value)) {
              throw new Error('전화번호는 10-11자리 숫자로 입력해주세요.');
            }
            break;

          case 'nickName':
            if (value.length < 2) {
              throw new Error('닉네임은 2자 이상이어야 합니다.');
            }
            break;

          case 'memberBirth':
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
              throw new Error('생년월일은 YYYY-MM-DD 형식이어야 합니다.');
            }
            break;
        }

        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[id as keyof FormErrors];
          return newErrors;
        });
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({
            ...prev,
            [id]: error.message,
          }));
        }
      }
    }
  };

  const validateForm = () => {
    const result = signupSchema.safeParse(formData);
    const newErrors: FormErrors = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof FormErrors;
        newErrors[path] = issue.message;
      });
    }

    setErrors(newErrors);
    return result.success;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const signUpData = {
      email: formData.email,
      password: formData.password,
      memberName: formData.memberName,
      phoneNumber: formData.phoneNumber,
      nickName: formData.nickName,
      memberBirth: formData.memberBirth,
      gender: formData.gender,
    };

    await signUp({
      ...signUpData,
      memberLevel: 'WHITE',
    });
    console.log(signUpData);

    setIsSubmitting(false);

    alert('회원가입이 완료되었습니다!');

    router.push('/sign-in');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='grid grid-row-7 gap-y-[24px] px-[30px] p-5'
    >
      <EmailForm
        onVerified={(verified, email) => {
          console.log('이메일 인증 상태:', verified, '이메일:', email);

          if (verified && email && formData.email !== email) {
            setFormData((prev) => ({
              ...prev,
              email,
            }));
          }
        }}
      />

      <div>
        <Input
          id='password'
          type='password'
          placeholder='비밀번호'
          value={formData.password}
          onChange={handleChange}
        />
        {formData.password !== '' && errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
        )}
      </div>

      <div>
        <Input
          id='passwordConfirm'
          type='password'
          placeholder='비밀번호 확인'
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        {formData.passwordConfirm !== '' && errors.passwordConfirm && (
          <p className='text-red-500 text-sm mt-1'>{errors.passwordConfirm}</p>
        )}
      </div>
      <div>
        <Input
          id='memberName'
          type='text'
          placeholder='이름'
          value={formData.memberName}
          onChange={handleChange}
        />
        {formData.memberName !== '' && errors.memberName && (
          <p className='text-red-500 text-sm mt-1'>{errors.memberName}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          전화번호
        </label>
        <Input
          id='phoneNumber'
          type='tel'
          placeholder='숫자만 입력하세요 (예: 01012345678)'
          value={formData.phoneNumber}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, '');
            setFormData((prev) => ({
              ...prev,
              phoneNumber: numericValue,
            }));

            if (numericValue && !/^\d{10,11}$/.test(numericValue)) {
              setErrors((prev) => ({
                ...prev,
                phoneNumber: '전화번호는 10-11자리 숫자로 입력해주세요.',
              }));
            } else {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.phoneNumber;
                return newErrors;
              });
            }
          }}
        />
        {formData.phoneNumber !== '' && errors.phoneNumber && (
          <p className='text-red-500 text-sm mt-1'>{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <Input
          id='nickName'
          type='text'
          placeholder='닉네임'
          value={formData.nickName}
          onChange={handleChange}
        />
        {formData.nickName !== '' && errors.nickName && (
          <p className='text-red-500 text-sm mt-1'>{errors.nickName}</p>
        )}
      </div>

      <div>
        <Input
          id='memberBirth'
          type='date'
          placeholder='생년월일'
          value={formData.memberBirth}
          onChange={(e) => {
            const dateValue = e.target.value;
            console.log('선택된 날짜:', dateValue);

            setFormData((prev) => ({
              ...prev,
              memberBirth: dateValue,
            }));

            if (dateValue) {
              if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
                setErrors((prev) => ({
                  ...prev,
                  memberBirth: '생년월일은 YYYY-MM-DD 형식이어야 합니다.',
                }));
              } else {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.memberBirth;
                  return newErrors;
                });
              }
            }
          }}
          className='w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'
        />
        {formData.memberBirth !== '' && errors.memberBirth && (
          <p className='text-red-500 text-sm mt-1'>{errors.memberBirth}</p>
        )}
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          성별
        </label>
        <div className='flex gap-2 mt-4'>
          <Button
            type='button'
            width='half'
            size='sm'
            variant={formData.gender === 'M' ? 'default' : 'outline'}
            onClick={() =>
              handleChange({
                target: {
                  id: 'gender',
                  value: 'M',
                },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
          >
            남성
          </Button>
          <Button
            type='button'
            width='half'
            size='sm'
            variant={formData.gender === 'W' ? 'default' : 'outline'}
            onClick={() =>
              handleChange({
                target: {
                  id: 'gender',
                  value: 'W',
                },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
          >
            여성
          </Button>
        </div>
      </div>

      {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}
      {allFieldsFilled ? (
        <Button
          type='submit'
          variant={
            Object.keys(errors).length > 0 || isSubmitting
              ? 'disabled'
              : 'default'
          }
          size='default'
          className='mt-8 w-full'
          disabled={Object.keys(errors).length > 0 || isSubmitting}
        >
          {isSubmitting ? '처리 중...' : '회원가입'}
        </Button>
      ) : (
        <p className='text-center text-gray-500 mt-8'>ㅇㅇ</p>
      )}
    </form>
  );
}
