import StarBucksLogo from '@/components/ui/auth/terms/StarBucksIcon';
import { Title } from '@/components/ui/common';

function TopTitle() {
  return (
    <section>
      <StarBucksLogo />
      <Title level={2} className='my-[40px]'>
        고객님
        <br />
        환영합니다!
      </Title>
    </section>
  );
}

export default TopTitle;
