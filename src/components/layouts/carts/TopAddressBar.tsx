import DefaultAddressState from '@/components/modules/carts/DefaultAddressState';
import SelectedAddressState from '@/components/modules/carts/SelectedAddressState';

interface TopAddressBarProps {
  memberAddressUuid?: string;
}

function TopAddressBar({ memberAddressUuid }: TopAddressBarProps) {
  if (!memberAddressUuid) {
    return (
      <section className='bg-gray-200 p-[24px]'>
        <DefaultAddressState />
      </section>
    );
  }
  return (
    <section className='bg-gray-200 p-[24px]'>
      <SelectedAddressState memberAddressUuid={memberAddressUuid} />
    </section>
  );
}
export default TopAddressBar;
