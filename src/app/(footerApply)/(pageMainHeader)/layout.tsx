import PageMainHeader from '@/components/layouts/Header/PageMainHeader';

export default function PageMainHeaderLayout({
  children,
}: {
  children?: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <PageMainHeader />
      {children}
    </>
  );
}
