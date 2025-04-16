'use server';

import { z } from 'zod';

import { signInDataType } from '@/types/responseDataTypes';
import { instance } from '../instance';
import { ApiResponse } from '@/types/common';
import { SignUpRequestData } from '@/types/auth';

export const signInRequest = async (credentials: {
  email: string;
  password: string;
}): Promise<signInDataType> => {
  const response = await instance.post<signInDataType>(`/auth/sign-in`, {
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  return response.data;
};

const emailSchema = z
  .string()
  .email({ message: '유효한 이메일 형식이 아닙니다.' });
const codeSchema = z
  .string()
  .min(4, { message: '유효한 인증번호가 아닙니다.' });

export async function checkEmailDuplication(email: string) {
  try {
    emailSchema.parse(email);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await instance.post('/auth/email/exists', {
      body: JSON.stringify({
        email,
      }),
    });

    if (response.data) {
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

    await instance.post('/auth/email/send-code', {
      body: JSON.stringify({
        email: email,
      }),
    });

    return { success: true, message: '인증번호가 발송되었습니다.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: '인증번호 발송 중 오류가 발생했습니다.' };
  }
}

export async function verifyCode(
  email: string,
  code: string,
): Promise<ApiResponse<Record<string, never>>> {
  try {
    emailSchema.parse(email);
    codeSchema.parse(code);

    const response = await instance.post<ApiResponse<Record<string, never>>>(
      '/auth/email/verify-code',
      {
        body: JSON.stringify({
          email,
          code,
        }),
      },
    );

    return response.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw {
        code: 400,
        status: 'BAD_REQUEST',
        message: error.errors[0].message,
      };
    }
    throw {
      code: 500,
      status: 'INTERNAL_SERVER_ERROR',
      message: '인증번호 확인 중 오류가 발생했습니다.',
    };
  }
}

export async function signUp(data: SignUpRequestData) {
  try {
    const response = await instance.post<ApiResponse<string>>('/auth/sign-up', {
      body: JSON.stringify(data),
    });

    return response.data;
  } catch (error) {
    console.error('회원가입 오류:', error);
    return {
      code: 500,
      status: 'INTERNAL_SERVER_ERROR',
      message: '회원가입 중 오류가 발생했습니다.',
      data: '',
    };
  }
}
