import { useState, useEffect } from 'react';
import { FormErrors, SignUpFormState } from '@/types/auth';
import { validateField } from '@/lib/signUp/utils';
import { signUp } from '@/actions/auth-service';

export function useSignUpForm() {
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
    const fieldId = id as keyof SignUpFormState;

    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    const errorMessage = validateField(fieldId, value, formData.password);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMessage) {
        newErrors[fieldId] = errorMessage;
      } else {
        delete newErrors[fieldId];
      }

      if (fieldId === 'password' && formData.passwordConfirm) {
        const confirmError = validateField(
          'passwordConfirm',
          formData.passwordConfirm,
          value,
        );
        if (confirmError) {
          newErrors.passwordConfirm = confirmError;
        } else {
          delete newErrors.passwordConfirm;
        }
      }

      return newErrors;
    });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');

    setFormData((prev) => ({
      ...prev,
      phoneNumber: numericValue,
    }));

    const errorMessage = validateField('phoneNumber', numericValue);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMessage) {
        newErrors.phoneNumber = errorMessage;
      } else {
        delete newErrors.phoneNumber;
      }
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      const fieldId = key as keyof SignUpFormState;
      const errorMessage = validateField(
        fieldId,
        value as string,
        formData.password,
      );
      if (errorMessage) {
        newErrors[fieldId] = errorMessage;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
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

      return { success: true };
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : '회원가입 중 오류가 발생했습니다.',
      );
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  const setEmail = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      email,
    }));
  };

  const setGender = (gender: 'M' | 'W') => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  return {
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
  };
}
