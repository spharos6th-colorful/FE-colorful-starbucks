import { Body, SubTitle } from '@/components/ui/common';

type MenuWelcomeProps = {
  title: string;
  text: string;
};

function MenuText({ title, text }: MenuWelcomeProps) {
  return (
    <section className='px-6 py-5 space-y-3'>
      <SubTitle>{title}</SubTitle>
      <Body level={3}>{text}</Body>
    </section>
  );
}

export default MenuText;
