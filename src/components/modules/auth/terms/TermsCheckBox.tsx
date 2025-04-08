import ArrowButton from '@/components/ui/auth/terms/ArrowButton';
import { Checkbox } from '@/components/ui/CheckBox';
import { Body } from '@/components/ui/common';
import { getTermsTag } from '@/lib/auth/sign-up/util';
import { TermsDataType } from '@/types/auth/sign-up/responseDataType';

type TermsCheckBoxProps = {
  termsId: number;
};

async function TermsCheckBox({ termsId }: TermsCheckBoxProps) {
  // const item = await getTermsAction(termsId);
  const item: TermsDataType = {
    termsId,
    required: true,
    termsTitle: '더미 약관 제목',
    termsContent: '더미 약관 내용입니다.',
  };

  const tag = getTermsTag(item.required);
  return (
    <li className='flex w-full'>
      <label htmlFor={item.termsId.toString()} className=' flex grow items-center'>
        <Checkbox id={item.termsId.toString()} />
        <Body level={3} className='text-text-600 mx-[8px]'>
          {tag}
          {item.termsTitle}
        </Body>
      </label>

      <ArrowButton href={`/terms/${termsId}`} />
    </li>
  );
}

export default TermsCheckBox;
