import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수 입력 항목입니다.' })
    .email({ message: '유효한 이메일 형식이 아닙니다.' }),
  verificationCode: z
    .string()
    .min(1, { message: '인증번호는 필수 입력 항목입니다.' })
    .optional(),
});

export const signupSchema = formSchema
  .extend({
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .regex(/.*[!@#$%^&*].*/, '특수문자를 포함해야 합니다.'),
    passwordConfirm: z.string(),
    memberName: z.string().min(2, { message: '이름은 2자 이상이어야 합니다.' }),
    phoneNumber: z
      .string()
      .regex(/^\d{10,11}$/, '전화번호는 10-11자리 숫자로 입력해주세요.'),
    nickName: z.string().min(2, { message: '닉네임은 2자 이상이어야 합니다.' }),
    memberBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, '생년월일은 YYYY-MM-DD 형식이어야 합니다.'),
    gender: z.enum(['M', 'W']),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
export type EmailFormData = z.input<typeof formSchema>;

export default formSchema;
