import FooterInfo from './FooterInfo';
import TermConditionList from './TermConditionList';

export default function Footer() {
  return (
    <footer className='pb-[120px] md:pb-[200px] space-y-6'>
      <TermConditionList />

      <FooterInfo />
    </footer>
  );
}
