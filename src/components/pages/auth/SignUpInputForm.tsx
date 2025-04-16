'use client';

import { useRouter } from 'next/navigation';
import EmailForm from './EmailForm';
import SignUpFormField from './SignUpFormField';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import GenderSelector from '@/components/modules/auth/GenderSelector';
import SubmitButton from '@/components/modules/auth/SummitButton';

export default function SignUpInputForm() {
  const router = useRouter();
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    allFieldsFilled,
    handleChange,
    handlePhoneNumberChange,
    handleSubmit,
    setEmail,
    setGender,
  } = useSignUpForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await handleSubmit(e);
    if (result?.success) {
      alert('회원가입이 완료되었습니다!');
      router.push('/sign-in');
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className='grid grid-row-7 gap-y-[24px] px-[30px] p-5'
    >
      <EmailForm
        onVerified={(verified, email) => {
          if (verified && email && formData.email !== email) {
            setEmail(email);
          }
        }}
      />
      <SignUpFormField
        id='password'
        type='password'
        placeholder='비밀번호'
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SignUpFormField
        id='passwordConfirm'
        type='password'
        placeholder='비밀번호 확인'
        value={formData.passwordConfirm}
        onChange={handleChange}
        error={errors.passwordConfirm}
      />
      <SignUpFormField
        id='memberName'
        type='text'
        placeholder='이름'
        value={formData.memberName}
        onChange={handleChange}
        error={errors.memberName}
      />
      <SignUpFormField
        id='phoneNumber'
        type='tel'
        label='전화번호'
        placeholder='숫자만 입력하세요'
        value={formData.phoneNumber}
        onChange={handlePhoneNumberChange}
        error={errors.phoneNumber}
      />
      <SignUpFormField
        id='nickName'
        type='text'
        placeholder='닉네임'
        value={formData.nickName}
        onChange={handleChange}
        error={errors.nickName}
      />
      <SignUpFormField
        id='memberBirth'
        type='date'
        placeholder='생년월일'
        value={formData.memberBirth}
        onChange={handleChange}
        error={errors.memberBirth}
        className='w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'
      />

      <GenderSelector value={formData.gender} onChange={setGender} />

      {submitError && <p className='text-red-500 text-sm'>{submitError}</p>}

      {allFieldsFilled && (
        <SubmitButton
          isSubmitting={isSubmitting}
          disabled={Object.keys(errors).length > 0 || isSubmitting}
        />
      )}
    </form>
  );
}
