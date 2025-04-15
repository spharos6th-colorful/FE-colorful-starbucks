import PageMSubHeader from '@/components/layouts/Header/PageSubHeader';

export default function PageMainHeaderLayout({
  children,
}: {
  children?: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <PageMSubHeader />
      {children}
    </>
  );
}
