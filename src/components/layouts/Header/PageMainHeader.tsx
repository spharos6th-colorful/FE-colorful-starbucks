import Prev from './Prev';
import Logo from './Logo';
import UtilWrapper from './UtilWrapper';
import Search from './Search';
import Cart from './Cart';

export default function PageMainHeader() {
  return (
    <header className='sticky flex justify-between items-center px-4 py-3 shadow-1'>
      <Prev />

      <Logo />

      <UtilWrapper>
        <Search />
        <Cart />
      </UtilWrapper>
    </header>
  );
}
