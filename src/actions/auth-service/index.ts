import { signInDataType } from '@/types/responseDataTypes';
import { instance } from '../instance';

export const signInRequest = async (credentials: { email: string; password: string }): Promise<signInDataType> => {
  const response = await instance.post<signInDataType>(`/auth/sign-in`, {
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  return response.data;
};
