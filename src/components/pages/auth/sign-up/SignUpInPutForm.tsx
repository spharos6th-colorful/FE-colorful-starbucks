import EmailForm from '@/components/modules/auth/sign-up/EmailForm';
import { Input } from '@/components/ui/common/input';

function SignUpInPutForm() {
  return (
    <form className='grid grid-row-5 gap-y-[24px] px-[30px]'>
      <EmailForm />
      <Input type='password' placeholder='비밀번호' />
      <Input type='password' placeholder='비밀번호 확인' />
      <Input type='text' placeholder='이름' />
      <Input type='text' placeholder='닉네임' />
    </form>
  );
}

export default SignUpInPutForm;
