'use server';

import { z } from 'zod';

const emailSchema = z.string().email({ message: '유효한 이메일 형식이 아닙니다.' });
const codeSchema = z.string().min(4, { message: '유효한 인증번호가 아닙니다.' });

export async function checkEmailDuplication(email: string) {
  try {
    emailSchema.parse(email);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isEmailUsed = email.includes('used');

    if (isEmailUsed) {
      return { success: false, message: '이미 사용 중인 이메일입니다.' };
    }

    return { success: true, message: '사용 가능한 이메일입니다.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: '이메일 확인 중 오류가 발생했습니다.' };
  }
}

export async function sendVerificationCode(email: string) {
  try {
    emailSchema.parse(email);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return { success: true, message: '인증번호가 발송되었습니다.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: '인증번호 발송 중 오류가 발생했습니다.' };
  }
}

export async function verifyCode(email: string, code: string) {
  try {
    emailSchema.parse(email);
    codeSchema.parse(code);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // fix me  수정필요
    const isCodeValid = code === '1234';

    if (!isCodeValid) {
      return { success: false, message: '유효하지 않은 인증번호입니다.' };
    }

    return { success: true, message: '인증이 완료되었습니다.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: '인증번호 확인 중 오류가 발생했습니다.' };
  }
}
