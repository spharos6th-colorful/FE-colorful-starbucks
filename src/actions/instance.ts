import { revalidateTag } from 'next/cache';
// import { auth } from '@/lib/auth'; // 아직 구현되지 않음

interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

interface NextFetchRequestConfig {
  tags?: string[];
  revalidate?: number | false;
}

interface RequestOptions extends RequestInit {
  isMultipart?: boolean;
  requireAuth?: boolean;
  cache?: RequestCache;
  tags?: string[]; // Next.js 캐싱 태그
  revalidate?: number | false; // 재검증 시간 (초)
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const fetchInstance = async <T = undefined>(
  url: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    // auth 체크 및 토큰 추가 (현재 주석)
    /* 
    if (options.requireAuth !== false) {
      try {
        const session = await auth();
        const accessToken = session?.user?.accessToken;

        if (!accessToken) {
          console.error('No access token found');
          throw new Error('Authentication required');
        }

        headers.Authorization = `Bearer ${accessToken}`;
      } catch (authError) {
        console.error('Auth error:', authError);
        throw new Error('Authentication failed');
      }
    }
    */

    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    } else {
      headers['Content-Type'] = 'application/json';
      if (typeof options.body === 'object') {
        options.body = JSON.stringify(options.body);
      }
    }

    const nextOptions: NextFetchRequestConfig = {};

    if (options.tags && options.tags.length > 0) {
      nextOptions.tags = options.tags;
    }

    if (options.revalidate !== undefined) {
      nextOptions.revalidate = options.revalidate;
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      cache: options.cache,
      next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      console.error('Unexpected content type:', contentType);
      const text = await response.text();
      console.error('Response text:', text);
      throw new Error('Invalid response format');
    }

    const result = (await response.json()) as ApiResponse<T>;

    if (!response.ok) {
      console.error('API Error:', result);
    }

    return result;
  } catch (error) {
    console.error('Fetch error:', error);

    return {
      code: 500,
      status: 'INTERNAL_SERVER_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
      data: null as T,
    } as ApiResponse<T>;
  }
};

export const revalidateCache = (tag: string) => {
  try {
    revalidateTag(tag);
    return true;
  } catch (error) {
    console.error('Error revalidating tag:', error);
    return false;
  }
};

export const instance = {
  get: async <T>(
    url: string,
    options: Omit<RequestOptions, 'body' | 'method'> = {},
  ) => {
    return fetchInstance<T>(url, { method: 'GET', ...options });
  },

  post: async <T>(
    url: string,
    options: Omit<RequestOptions, 'method'> = {},
  ) => {
    return fetchInstance<T>(url, { method: 'POST', ...options });
  },

  patch: async <T>(
    url: string,
    options: Omit<RequestOptions, 'method'> = {},
  ) => {
    return fetchInstance<T>(url, { method: 'PATCH', ...options });
  },

  put: async <T>(url: string, options: Omit<RequestOptions, 'method'> = {}) => {
    return fetchInstance<T>(url, { method: 'PUT', ...options });
  },

  delete: async <T>(
    url: string,
    options: Omit<RequestOptions, 'body' | 'method'> = {},
  ) => {
    return fetchInstance<T>(url, { method: 'DELETE', ...options });
  },
};
