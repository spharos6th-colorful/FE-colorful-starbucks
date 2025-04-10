import MainHeader from '@/components/layouts/Header/MainHeader';

export default function MainHeaderLayout({ children }: { children?: Readonly<React.ReactNode> }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
