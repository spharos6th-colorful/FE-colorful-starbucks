/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

import { signInDataType } from '@/types/responseDataTypes';
import { ApiResponse } from '@/types/common';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${process.env.BASE_URL}/auth/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          if (!response.ok) {
            throw new Error('Invalid credentials');
          }

          const user = (await response.json()) as ApiResponse<signInDataType>;
          return user.data;
        } catch (error) {
          console.error('Error during sign-in:', error);
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (profile && account) {
    //     console.log('profile', profile);
    //     console.log('account', account);
    //     console.log('user', user);
    //     try {
    //       const res = await fetch(`http://localhost:8080/api/v1/auth/oauth-sign-in`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           provider: account.provider,
    //           providerId: account.providerAccountId,
    //           providerEmail: 'beat1103@gmail.com',
    //         }),
    //         cache: 'no-cache',
    //       });
    //       const data = (await res.json()) as ApiResponse<signInDataType>;
    //       console.log('server data', data);
    //       user.accessToken = data.data.accessToken;
    //       // user.refreshToken = data.result.refreshToken;
    //       // user.name = data.result.name;
    //       // user.uuid = data.result.uuid;
    //       console.log('kakao', user);
    //       return true;
    //     } catch (error) {
    //       console.error('error', error);
    //       return '/sign-up';
    //     }
    //   }
    //   return true;
    // },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
};
