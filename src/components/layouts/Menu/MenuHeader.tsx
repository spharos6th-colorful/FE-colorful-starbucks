import { useMenuContext } from '@/context/MenuContext';
import CloseIcon from '@/assets/icons/common/close.svg';

function MenuHeader() {
  const { setIsOpen } = useMenuContext();
  const onClick = () => setIsOpen((prev) => !prev);
  return (
    <section className='flex justify-end px-6 py-4'>
      <button onClick={onClick} className='cursor-pointer'>
        <CloseIcon width={24} height={24} fill='var(--color-text-900)' />
      </button>
    </section>
  );
}

export default MenuHeader;
