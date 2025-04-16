import { SignUpFormState } from '@/types/auth';

export const validateField = (
  id: keyof SignUpFormState,
  value: string,
  currentPassword?: string,
): string | null => {
  try {
    switch (id) {
      case 'password':
        if (value.length < 8) {
          return '비밀번호는 8자 이상이어야 합니다.';
        }
        if (!/.*[!@#$%^&*].*/.test(value)) {
          return '특수문자를 포함해야 합니다.';
        }
        return null;

      case 'passwordConfirm':
        if (value !== currentPassword) {
          return '비밀번호가 일치하지 않습니다.';
        }
        return null;

      case 'memberName':
        if (value.length < 2) {
          return '이름은 2자 이상이어야 합니다.';
        }
        return null;

      case 'phoneNumber':
        if (!/^\d{10,11}$/.test(value)) {
          return '전화번호는 10-11자리 숫자로 입력해주세요.';
        }
        return null;

      case 'nickName':
        if (value.length < 2) {
          return '닉네임은 2자 이상이어야 합니다.';
        }
        return null;

      case 'memberBirth':
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return '생년월일은 YYYY-MM-DD 형식이어야 합니다.';
        }
        return null;

      default:
        return null;
    }
  } catch (error) {
    return error instanceof Error
      ? error.message
      : '알 수 없는 오류가 발생했습니다.';
  }
};
