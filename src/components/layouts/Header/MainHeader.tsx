import Menu from './Menu';
import Logo from './Logo';
import UtilWrapper from './UtilWrapper';
import Cart from './Cart';
import Search from './Search';

export default function MainHeader() {
  return (
    <header className='sticky flex justify-between items-center px-4 py-3 shadow-1'>
      <Menu />

      <Logo />

      <UtilWrapper>
        <Search />
        <Cart />
      </UtilWrapper>
    </header>
  );
}
