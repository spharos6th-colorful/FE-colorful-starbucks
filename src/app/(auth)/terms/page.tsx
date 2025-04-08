import NextBottom from '@/components/layouts/auth/sign-up/NextBottom';
import AllCheckBox from '@/components/modules/auth/sign-up/AllCheckBox';
import TermsList from '@/components/modules/auth/sign-up/TermsList';
import TopTitle from '@/components/modules/auth/sign-up/TopTitle';

export default function TermsPag() {
  return (
    <main>
      <section className='p-[28px] '>
        <TopTitle />
        <AllCheckBox />
        <TermsList />
      </section>
      <NextBottom />
    </main>
  );
}
