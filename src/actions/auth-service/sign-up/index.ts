'use server';

import type { TermsDataType } from '@/types/auth/sign-up/responseDataType';

export const getTermsAction = async (termsId: number): Promise<TermsDataType> => {
  const response = await fetch(`/api/v1/auth/terms/${termsId}`, { method: 'GET' });

  if (!response.ok) {
    throw new Error('약관 정보를 가져오는데 실패했습니다');
  }

  const data = await response.json();
  return data;
};

export const getTermsListAction = async (): Promise<TermsDataType[]> => {
  const response = await fetch('/api/v1/auth/terms', { method: 'GET' });

  if (!response.ok) {
    throw new Error('약관 정보를 가져오는데 실패했습니다');
  }

  const data = await response.json();
  return data;
};
