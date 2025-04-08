import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수 입력 항목입니다.' })
    .email({ message: '유효한 이메일 형식이 아닙니다.' }),
  verificationCode: z.string().min(1, { message: '인증번호는 필수 입력 항목입니다.' }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default formSchema;
