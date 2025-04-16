'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import AgreementCheckbox from '@/components/modules/auth/AgreementCheckBox';
import AgreementSubmitButton from '@/components/modules/auth/AgreementSubmitButton';
import WelcomeSection from '@/components/pages/auth/WelcomeSection';
import { agreementItems } from '@/data/auth/agreementData';
import { CheckboxState } from '@/types/auth';

export default function SignUpPage() {
  const router = useRouter();

  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    all: false,
    terms: false,
    privacy: false,
    card: false,
    marketing: false,
  });

  const [isAllRequiredChecked, setIsAllRequiredChecked] = useState(false);

  const handleCheckboxChange = (id: string) => {
    if (id === 'all') {
      const newValue = !checkboxes.all;
      setCheckboxes({
        all: newValue,
        terms: newValue,
        privacy: newValue,
        card: newValue,
        marketing: newValue,
      });
    } else {
      const newCheckboxes: CheckboxState = {
        ...checkboxes,
        [id]: !checkboxes[id],
      };

      const allChecked = agreementItems.every((item) => newCheckboxes[item.id]);
      newCheckboxes.all = allChecked;

      setCheckboxes(newCheckboxes);
    }
  };

  useEffect(() => {
    const requiredChecked = agreementItems
      .filter((item) => item.required)
      .every((item) => checkboxes[item.id]);

    setIsAllRequiredChecked(requiredChecked);
  }, [checkboxes]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllRequiredChecked) {
      router.push('sign-up/user-info');
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <WelcomeSection />

      <form
        onSubmit={handleSubmit}
        className='group w-full font-semibold tracking-tighter px-4 pb-40'
      >
        <AgreementCheckbox
          id='all'
          label='전체동의'
          required={false}
          checked={checkboxes.all}
          onChange={() => handleCheckboxChange('all')}
          hasLink={false}
        />

        <hr className='border-t border-gray-400' />

        {agreementItems.map((item) => (
          <AgreementCheckbox
            key={item.id}
            id={item.id}
            label={item.label}
            required={item.required}
            checked={checkboxes[item.id as keyof typeof checkboxes]}
            onChange={() => handleCheckboxChange(item.id)}
          />
        ))}

        <AgreementSubmitButton isActive={isAllRequiredChecked} />
      </form>
    </main>
  );
}
