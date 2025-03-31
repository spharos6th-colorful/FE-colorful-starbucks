import MoreButton from '../../ui/main/MoreButton';

type SectionHeaderProps = {
  title: string;
  eventUuid: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-[30px]'>
      <h2 className='text-title2'>{title}</h2>
      <MoreButton href='' title='더보기' />
    </div>
  );
}
