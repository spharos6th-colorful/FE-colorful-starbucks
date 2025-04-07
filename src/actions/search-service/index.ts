'use server';

import { SearchQueryRequestDataType } from '@/types/search/requestDataTypes';

export const getSearchResults = async (data: SearchQueryRequestDataType) => {
  const queryData = Object.entries(data);
  const searchParams = new URLSearchParams(queryData).toString();

  try {
    const res = await fetch(`/api/v1/search?${searchParams}`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const getRecentSearchHistory = async () => {
  try {
    const res = await fetch(`/api/v1/search`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const deleteRecentSearchHistory = async (id: number[]) => {
  const recentSearchHistoryId = id.map((item) => ({ id: item }));
  try {
    const res = await fetch(`/api/v1/search`, {
      method: 'DELETE',
      body: JSON.stringify({ recentSearchHistoryId }),
    });

    if (!res.ok) {
      throw new Error('Failed to delete data');
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const addRecentSearchHistory = async (query: string) => {
  try {
    const res = await fetch(`/api/v1/search`, {
      method: 'POST',
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error('Failed to add data');
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};
